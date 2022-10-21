createMenu({
    id: "colorsMenu",
    key: "colors",
    header: "COLORS",
    elements: [
        new Select({
            key: "player_color",
            text: "PLAYER COLOR",
            options: [
                { label: getText("default"), value: "default" },
                { label: getText("red"), value: "red" },
                { label: getText("yellow"), value: "yellow" },
                { label: getText("green"), value: "green" },
            ],
            onChange: (input) => {
                playerColorKey = input.options[input.currentOption].value;
                swapPlayerColors();
            },
        }),
    ],
});
