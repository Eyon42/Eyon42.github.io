module.exports = {
    mode: "jit",
    purge: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './*.html',
    ],
    darkMode: false,
    theme: {
        fontFamily: {
            'sans': ['Open Sans']
        },
        extend: {
            colors: {
                primaryRed: "#d64937",
                strongRed: "#dc240c",
                secondaryRed: "#df7568",
                white0: "#ffffff",
                white1: "#f8f9fa",
                white2: "#ebebeb",
                white3: "#C0C0C4",
                black0: "#131516",
                black1: "#212529",
                black2: "#4F4F54",
            },
            height: {
                "screen75": "75vh",
                "screen90": "90vh",
                "screen/2": "50vh",
                "screen/3": "calc(100vh / 3)",

            },
            transitionDuration: {
                '0': '0ms',
                '2500': '2500ms',
                '5000': '5000ms',
            }
        },
    },
    variants: {},
    safelist: [
        "text-black0", "text-[#5E7BA7]", "text-[#F0DA50]", "text-[#505050]"
    ],
    plugins: [
        require('@tailwindcss/typography'),
    ],
}