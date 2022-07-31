use const_random::const_random;

pub struct Color {
    pub name: &'static str,
    pub rgb: u32,
}

pub const PAIRS: [(Color, Color); 4] = [
    (ENGLISH_RED, CERULIAN_BLUE),
    (DARK_TYRIAN_BLUE, YELLO_ORANGE),
    (PALE_LEMON_YELLOW, RAW_SIENNA),
    (RED_VIOLET, ISABELLA_COLOR),
];

pub const ENGLISH_RED: Color = Color {
    name: "english red",
    rgb: 0xAC390C,
};

pub const CERULIAN_BLUE: Color = Color {
    name: "cerulian blue",
    rgb: 0x2F5257,
};

pub const DARK_TYRIAN_BLUE: Color = Color {
    name: "dark tyrian blue",
    rgb: 0x1e2533,
};

pub const YELLO_ORANGE: Color = Color {
    name: "yellow orange",
    rgb: 0xb45400,
};

pub const PALE_LEMON_YELLOW: Color = Color {
    name: "pale lemon yellow",
    rgb: 0xD3C278,
};

pub const RAW_SIENNA: Color = Color {
    name: "raw sienna",
    rgb: 0x914a06,
};

pub const RED_VIOLET: Color = Color {
    name: "red violet",
    rgb: 0x370425,
};

pub const ISABELLA_COLOR: Color = Color {
    name: "isabella color",
    rgb: 0x9a732F,
};

pub const fn pick_two_colors() -> &'static (Color, Color) {
    const MY_RANDOM_NUMBER: u16 = const_random!(u16);
    let max_u16 = u16::max_value();
    let index = (PAIRS.len() * MY_RANDOM_NUMBER as usize) / max_u16 as usize;
    &PAIRS[index]
}
