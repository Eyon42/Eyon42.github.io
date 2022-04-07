---
title: "How to setup Brownie with VS Code"
layout: blogpost
author: "Francesco Gentile"
---

One of the things that has a great impact on my developer experience and performance on any platform is how well set up is my development environment and project structure. This is one of those thing that, because they were very simple, most programming tutorials skipped and let me to figure out for myself, or rather just take the default code editor's functionality and miss out on very cool and useful tools.

That is why in most cases, for a beginner programmer, the best choice is an IDE made specifically for their language or ecosystem. As is the case with PyCharm for Python and Remix for Solidity. But once we get to more advanced projects we see the need to use multiple languages for different parts of the project (unless you are a Javascript fullstack wizard). That's where extensible code editors, like VS Code and Atom, which come with very basic functionality for text editors and all the rest is added as plugins.


To begin, create a folder where your project will live and open it with VS Code

## Setting up the editor

Now it's time to install some extensions

As this is a guide for solidity, we are going to keep things super simple with just two extensions which do most of the work. 

### Python extension
![](/assets/Images/BrownieVSCode/PythonExtension.png)
Just a base python extension that handles IntelliSense, linting, debugging, code navigation, code formatting, refactoring and many other things

### Hardhat extension
![](/assets/Images/BrownieVSCode/HardhatExtension.png)
Aren't we using Brownie? Isn't there an extension exclusively for Solidity?

Yes, but in my experience they don't work very well. The linting in the solidity is very poor and only catches very basic syntax errors. This extension, highlights more subtle error (like type errors) which with other extensions would be caught by the compiler (which is frustrating and wastes time) and some other things that are just bad practices.

There are many more extensions you can add, but with this two we are fine for now.

A final detail, mostly to keep code pretty and consistent, is to go to the VS Code settings and enable `Format On Save`.

## Installing Brownie and other libraries

The recommended way of [installing brownie](https://eth-brownie.readthedocs.io/en/stable/install.html) in the documentation is using `pipx`, which installs Brownie globally as a tool which is nice and easy to use. As long as you don't need to work with other libraries or frameworks in the same project because you will also have to install them globally. Also, for running the code in other machines, I find it better to keep the projects dependencies in the project folder. That is why most Python deveopers use virtual environments.

Python virtual environments (venv) allow you to have a sandboxed Python instance on your project folder that's independent of your global install or other projects.

To create a venv open a terminal in your project's root and run the python "venv" module with "venv" as an argument for the venv folder(A bit confusing, but yeah).

```sh
$ python3 -m venv venv
```

And then activate it with:

```sh
$ source venv/bin/activate
```
 
Your command prompt should look something like this:

```sh
(venv) eyon@desktop:~/project$ 
```

Now that we are inside our venv we can start installing our dependencies

First we install Brownie with:
```sh
$ pip install eth-brownie
```

Then we install autopep-8 (If VS Code hasn't prompted you yet to do it) to get consistent formatting for our Python code:
```sh
$ pip install autopep-8
```

If you need anything else, like `flask` or `numpy` you can install it the same way.

After all your libraries are installed (and after adding new libraries to the project) you need to save to a file a list of what libraries (and versions) you are using. This is in case you, or someone else, need to run the project on other location.

You do that with:
```sh
$ pip freeze > requirements.txt
```

And then, when you need to install everything again 
```sh
$ pip install -r requirements.txt
```

## Creating a Brownie project

With all of our dependencies installed we can proceed to initializing the Brownie project with:
```sh
$ brownie init -f
```
> The -f flag is to ignore existing folders and files.

Now you should have a full folder structure ready to start writing some smart contracts and then some scripts and tests which we are not going to do now because this article isn't about that.

## Debugging

But, What happens when you run into problems while running tests or scripts? One very useful tool for debugging is, of course, the debugger, but the default configurations for debugging python are to directly run a script while Brownie requires that we use the `brownie run` command.

The solution to this is a custom `launch.json` file int the `.vscode` folder. This will allows us to select a new profile for debugging which will use brownie to run the currently opened script

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Brownie: Current Script",
            "type": "python",
            "request": "launch",
            "program": "./venv/bin/brownie",
            "args": [
                "run",
                "${file}"
            ],
            "console": "integratedTerminal",
        }
    ]
}
```


Breaking it down a bit, the configuration is very similar to the default Python debug configuration. The main changes are the `program` and the `args`.

The program is the `brownie` command line python script, which you can find using `whereis brownie` (You'd only need to find it in case you didn't install it on a venv).

Then there is the arguments array which is just `run` and the current file.

Now you can set a couple breakpoints, select the new profile in the debugger and press F5 to start debugging.

## Conclusion

Here we conclude this week's post. The solidity ecosystem, and specially Brownie is relatively new, so you may still find some rough edges and things that are a bit more manual than they need to be. But with the right setup you can have a pretty good developer experience.