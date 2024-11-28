import { Box, Button, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { deleteRatingAdmin } from "../../services/AdminService";

function RatingPageAdmin() {
  const { idPrinting } = useParams();
  const [ratingData, setRatingData] = useState({
    idRating: 4,
    rating: 4,
    comment:
      "rating 1rating 1rating 1rating  1rating 1rating 1rating 1ratinng 1rating  1rating 1rating 1rating 1rating  1",
  });

  async function deleteRatingData(idRating){
    try {
      await deleteRatingAdmin(idRating)
    } catch(err){
      console.log(err.message)
    }
  }

  return (
    <>
      <section className="p-8">
        <div>
          <h2 className="font-medium text-3xl text-center">Rating page</h2>
        </div>
        <hr className="my-5" />
        {/* rating and comment exist */}
        <Box
          sx={{
            display: "flex",
            my: 3,
            backgroundColor: "grey.100",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              justifyContent: "center",
              alignSelf: "flex-start",
              ml: 2,
              mt: 1,
              opacity: "90%",
            }}
          >
            <AccountCircleIcon sx={{ opacity: "80%", fontSize: "2.8em" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              mx: 1,
              mt: 1,
              flexDirection: "column",
              flexGrow: "0.9",
            }}
          >
            <Box display={"flex"}>
              <Box mr={1}>
                <Typography sx={{ fontWeight: "bold" }}>Rating:</Typography>
              </Box>
              <Rating
                name="simple-controlled"
                value={ratingData.rating}
                readOnly
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>Comment: </Typography>
              <Typography
                variant="subtitle"
                sx={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  maxHeight: "4.5em",
                  overflow: "auto",
                }}
              >
                {" "}
                {ratingData.comment}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                mr: 1,
              }}
            >
              
              <Box >
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => deleteRatingData(6)} // 6 la id rating mau, khi list danh sach cac rating thi thay bang idRating
                >
                  <Box mr={1}>
                    <DeleteIcon />
                  </Box>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
}
export { RatingPageAdmin };
