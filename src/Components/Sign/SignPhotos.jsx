// import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
// import React from "react";

// export default function SignPhotos() {
//   const [count, setCount] = React.useState(0);

//   setTimeout(() => {
//     if (count === 2) {
//       setCount((prev) => (prev = 0));
//     } else if (count === 1) {
//       setCount((prev) => (prev = 2));
//     } else {
//       setCount((prev) => (prev = 1));
//     }
//   }, 3000);

//   let renderImages = [
//     {
//       path: "Rectangle_324.png",
//       text: "Search Millions Of Routes & Find The Best Travel Deals Around The World.",
//     },
//     {
//       path: "Rectangle_325.png",
//       text: "Get The Best Deals For Your Next Hotel Booking With Few Steps.",
//     },
//     {
//       path: "Rectangle_326.png",
//       text: "Discover The Most Beautiful Places To Travel Around The World.",
//     },
//   ];
//   function handleClick(direction) {
//     function handleLeftClick() {
//       if (count === 0) {
//         setCount((prev) => prev + 2);
//       } else {
//         setCount((prev) => prev - 1);
//       }
//     }
//     function handleRightClick() {
//       if (count === 2) {
//         setCount((prev) => prev - 2);
//       } else {
//         setCount((prev) => prev + 1);
//       }
//     }
//     switch (direction) {
//       case "right":
//         handleRightClick();
//         break;
//       case "left":
//         handleLeftClick();
//         break;
//       default:
//         console.log("ERROR! A direction should be passed!");
//         break;
//     }
//   }
//   let theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

//   return (
//     <Box
//       sx={{
//         display: isMobile ? "none" : "block",
//         width: "62vw",
//         backgroundImage: `url(${require(`../../Images/Registeration/${renderImages[count].path}`)})`,
//         backgroundSize: "100% 100%",
//         position: "relative",
//       }}
//     >
//       <p
//         style={{
//           position: "absolute",
//           bottom: "2.775em",
//           left: "0.8em",
//           color: "#FFFFFF",
//           fontFamily: "Roboto",
//           fontWeight: "500",
//           fontSize: "2.5rem",
//           lineHeight: "1.185em",
//           inlineSize: "14.6em",
//         }}
//       >
//         {renderImages[count].text}
//       </p>
//       <Box sx={{ position: "absolute", bottom: "2.5em", right: "7.5em" }}>
//         <Button
//           sx={{
//             borderRadius: "50%",
//             marginRight: "2.5em",
//           }}
//           onClick={() => handleClick("left")}
//         >
//           <img
//             alt="left arrow"
//             src={require("../../Images/left-arrow-circle.png")}
//           />
//         </Button>
//         <Button
//           onClick={() => handleClick("right")}
//           sx={{
//             borderRadius: "50%",
//           }}
//         >
//           <img
//             alt="right arrow"
//             src={require("../../Images/right-arrow-circle.png")}
//           />
//         </Button>
//       </Box>
//     </Box>
//   );
// }
