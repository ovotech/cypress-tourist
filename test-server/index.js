const page = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column
            }

            div {
                background: yellow;
                height: 200px;
                width: 200px;
            }

            .alternative-style {
                background: green;
                width: 100px;
            }
        </style>
    </head>

    <body>
        <h1>Every request will change the shape and color</h1>
        <div data-to-be-toggled>
        </div>
    </body>

    <script>
        (function toggler() {
            const currentToggledState = window.location.hash
            window.location.hash = currentToggledState ? '' : true

            if (currentToggledState) {
                const element = document.querySelector("[data-to-be-toggled]")

                element.classList.toggle('alternative-style')
            }
        })()
    </script>
</html>
`

module.exports = async (req, res) => page
