export const colors = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
  green: {
    primary: "#44e308",
    secondary: "#cbfdc9",
  },
  purple: {
    primary: "#8008e3",
    secondary: "#f6d8fd",
  },
};


export const mealToColor = {
  Breakfast: colors.yellow,
  Lunch: colors.green,
  Dinner: colors.purple,
};

export const endpoint = "http://localhost:8080/api/v1/";

export const url = (path: string): string => JSON.stringify({ endpoint, path });

export const kitchenChangeMessage = `Due to inventory changes, your food deliver from
  $donor is changed from $kitchen1 to $kitchen2.`;
