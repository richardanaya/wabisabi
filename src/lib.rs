use rand::Rng;

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

pub fn pick_two_colors() -> &'static (Color, Color) {
    let mut rng = rand::thread_rng();
    let num_pairs = PAIRS.len();
    let pair_index = rng.gen::<f64>() * num_pairs as f64;
    &PAIRS[pair_index as usize]
}
