module.exports = {
    //mode: "jit",
    purge: [
        './_includes/**/*.html',
        './_layouts/**/*.html',
        './_posts/*.md',
        './*.html',
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primaryRed: "#d64937",
                secondaryRed: "#df7568",
                white0: "#ffffff",
                white1: "#f8f9fa",
                white2: "#ebebeb",
                white3: "#C0C0C4",
                black0: "#131516",
                black1: "#212529",
                black2: "#4F4F54",
            }
        },
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
    ],
}