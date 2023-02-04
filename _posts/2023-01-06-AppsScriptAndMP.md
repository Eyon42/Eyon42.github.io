---
layout: blogpost
title: "Using google Apps Script to create a ticketing system"
author: Francesco Gentile
---

I have been involved in the organization of several entrepreneurship, tech and web3 events over the last years. Usually most of them on a small budget where paying for a ticketing system was not an option. The most popular option for teams in these settings is to just use Google Forms for inscription and handle the payment manually through messages over email or WhatsApp. This is a very manual process and it is not very scalable. I have been looking for a solution to automate this process for a while and I finally found a way to do it with Google Apps Script.

## Google Apps Script, Google Workspaces's most powerful feature

Google Apps Script is a JavaScript runtime environment that allows you to automate tasks across Google products and third-party services and build web applications. It is a very powerful tool that can be used to automate a lot of tasks. It is also very easy to use and it is free. You can find more information about it [here](https://developers.google.com/apps-script).

Some examples of what you can do with Google Apps Script:
- Perform actions upon form submission such as sending an email to the user.
- Fetch external data and use it in your scripts or load it into a spreadsheet or other document.
- Add custom menus, dialogs, and sidebars to Google Docs, Sheets, Slides, or Forms.
- Create web apps that run in Google Cloud Platform.
- Create add-ons for Google Docs, Sheets, Slides, or Forms.
- Run scripts periodically using triggers.

In short, it takes everything you can do with Google products and puts it on steroids.

Using just this tool you can create a very simple process for signing up people for an event:
1. They fill a form with their information.
2. That gets sent to a spreadsheet.
3. A trigger fires and sends an email with the payment instructions to the user.
4. From there someone could manually check the payments and update the spreadsheet.

This is already an upgrade to what most teams I worked with were doing, and it can be done in a couple of minutes. But I wanted to go a step further and create a ticketing system that would allow me to not even have to check the payments manually. I wanted to be able to just send the payment instructions and have the system automatically check the payments and update the spreadsheet.

## Mercado Pago

Mercado Pago has so far been the leader of digitalization in personal finances in Latin America. Among its many features, it allows you to create payment links that can be used to receive payments from anyone with multiple payment methods and receive the money in your Mercado Pago account. It also has an API that allows you to automate the process of creating payment links for each user and checking the payments.

## The solution
After a couple iterations I landed upon a process that looks like this:

1. They fill a form with their information.
2. That gets sent to a spreadsheet.
3. The script creates a payment link through the Mercado Pago API and sends it to the user via email.
4. Once the user pays, we can redirect them to a “Thank you” page.
5. Periodically the script checks the payments, updates the script and sends an email to the user with the payment confirmation.

In any of those steps you can choose to hook in extra functionality. For one event, we choose to send tickets in the form of NFTs. The things you can do with this are endless.

So, now that we have the process, let's see how to implement it.

## Step by step

### 1. Create a Google Form
Go to google drive and navigate to the folder you will be using for the integration and create a new Google Form.
![Google Form](/assets/images/GoogleFormsMPIntegration/CreateGoogleForm.png)

Once your're here, you can add whatever info you want from the user. Just make sure that you are collecting emails so you can send them the payment link.

### 2. Link a Spreadsheet to the form
Go to the **Responses** tab and click on **Link to Sheets**.

![Google Form](/assets/images/GoogleFormsMPIntegration/LinkSpreadSheet.png)

Once the dialog opens, click on **Create a new spreadsheet** and give it a name.

This spreadsheet will be saved in the same folder as your form and all responses from the form will be saved in it.

### 3. Create a Google App Script
On the top bar, click on the **Extensions** button and then on **Apps Script**.
![Google Form](/assets/images/GoogleFormsMPIntegration/LinkAppsScript.png)

This will open a new tab with the Apps Script editor. You will see:
- A main window for editing code
- A bar with save, run, debug, function selector and logs on top
- Sidebar with project files
- Other sidebar linking to the editor, triggers, executions and settings for the project
  
![Google Form](/assets/images/GoogleFormsMPIntegration/Overview.png)

### Create the functions for emailing
Built into the Apps Script environment there are several Apps ready to be used. One of them is the MailApp. This allows you to send emails from your Google account. We will use this to send the payment link to the user.

```javascript
function sendPaymentEmail(email, paymentLink) {
  MailApp.sendEmail({
    to: email,
    subject: "Payment link",
    htmlBody: `Your payment link is: ${paymentLink}`,
  });
}
```

For the payment confirmation you can do something similar.

```javascript
function sendConfirmationEmail(email) {
  MailApp.sendEmail({
    to: email,
    subject: "Payment confirmed",
    htmlBody: "Your payment has been confirmed",
  });
}
```

### Creating the payment link
For creating the payment link we will use the Create Preferece endpoint. [You can find the documentation for this endpoint here](https://www.mercadopago.com.ar/developers/en/reference/preferences/_checkout_preferences/post).

Here is an example for one of the upcoming events:

```javascript
function generatePaymentPreference(externalReference) {
  
  const body = {
    "items": [
      {
        "title": "Web3Makers Marzo 2023",
        "description": "Para más información visita https://web3makers.org",
        "picture_url": "http://www.myapp.com/myimage.jpg",
        "category_id": "eventos",
        "quantity": 1,
        "currency_id": "ARS",
        "unit_price": 10
      }
    ],
    "expires": true,
    "date_of_expiration": "2023-03-03T00:00:00.000-03:00",
    "external_reference": externalReference,
    "payer": {
      "email": externalReference
    },
    "back_urls": {
      "failure": "https://web3makers.org/",
      "pending": "https://web3makers.org/",
      "success": "https://web3makers.org/"
    },
    "additional_info": "https://web3makers.org"
  }

  const response = UrlFetchApp.fetch(mpApiURL + "/checkout/preferences", {
    method: "post",
    headers: {
      "Authorization": "Bearer " + mpApiToken,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(body),
  })
  const data = JSON.parse(response.getContentText())
  return data.init_point
}
```

The important parts are:
- The item in the body. This is where you can set the price, the description, the picture, etc.
- Expiration date
- The Back URLs for redirection after payment
- The API token in the headers. You can get this by creating an app in your Mercado Pago account from the [Developer Dashboard](https://www.mercadopago.com.ar/developers/panel).

Then we write another function to check for new payments:

```javascript
// This is the column where we store if the user has paid, You'll have to add this column to your spreadsheet
const paymentConfirmationColumn = "C"

function checkPayments(){

  // We use the SpreadsheetApp to get the spreadsheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  // B is the row where the emails are usually stored
  // We get a list of all the emails
  const emails = sheet.getRange("B2:B").getValues().map(e=>e[0])

  // Docs: https://www.mercadopago.com.ar/developers/en/reference/payments/_payments_search/get
  const response = UrlFetchApp.fetch(mpApiURL + "/v1/payments/search?sort=date_created&criteria=desc", {
      headers: {
        "Authorization": "Bearer " + mpApiToken,
      },
  })

  const results = JSON.parse(response.getContentText()).results

  for (payment of results) {
    // Get the item
    let item = payment.additional_info?.items
    item = item ? item[0]: {}

    // Check if the payment is for the event
    if (item.quantity === "1" && item.title === "Web3Makers Marzo 2023") { // This should match with the title of the item in the preference

      // We first check if we've already registered the payment
      let checkTracking = false
      let positiion
      for (const [i,email] of emails.entries()) {
        if (email === address) {
          checkTracking = sheet.getRange(`${paymentConfirmationColumn}${i+2}`).getValue() // 1 to change from 0 to 1 indexed, + 1 to skip header row = 2
          position = i
        }
      }

      if (checkTracking) {
        // If it's paid, then we're up to date (They are ordered by date, so we can stop here)
        console.log("Done checking recent logs")
        return
      }

      console.log("Found payment for " + payment.external_reference)
      sheet.getRange(paymentConfirmationColumn + (position + 2)).setValue(true) // Set as paid
      sendPaymentConfirmationEmail(payment.external_reference) // You should define this function
    }
  }
}
```

### Putting things together

First we create a simple function to be called upon form submission. This will generate the payment link and send it to the user.

```javascript
function onFormSubmit(e) {
  const emailAddress = e.namedValues['Email Address'][0]
  const paymentLink = generatePaymentPreference(emailAddress)
  sendWelcomeEmail(emailAddress, paymentLink)
}
```


Then we create the triggers. To do this, go the the clock icon on the bar to the left that says "Triggers" upon hovering it. Then click on "Add Trigger".

For the form submission you can use these settings:

![Form Trigger](/assets/images/GoogleFormsMPIntegration/FormTrigger.png)

And then for checking payments you can set it to run every 5 minutes:

![Payment Trigger](/assets/images/GoogleFormsMPIntegration/PaymentTrigger.png)

## That's it!

Now you can use Google Forms to collect payments for your events. You can also use this to collect payments for other things, like donations, or even to sell products.

This is a very simple implementation, but it demonstrate the power of convenience of Google Apps Script as a tool to build simple applications fast to test new ideas or automate tasks quickly.
