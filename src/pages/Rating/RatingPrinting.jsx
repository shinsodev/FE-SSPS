import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import submitIcon from "../../assets/img/send.png";
import cancleIcon from "../../assets/img/cancle.png";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../services/customize-axios";
import { notifySuccess } from "../../components/Notification/NotifySuccess";
import { notifyError } from "../../components/Notification/NotifyError";
import EditRatingPopUp from "./PopUpEditRating";

function RatingPageStudent() {
  const { idPrinting } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isWriteRating, setWriteRating] = useState(false);
  const [ratingEdit, setRatingEdit] = useState(null);
  const [ratingData, setRatingData] = useState({
    idRating: 4,
    rating: 4,
    comment:
      "rating 1rating 1rating 1rating  1rating 1rating 1rating 1ratinng 1rating  1rating 1rating 1rating 1rating  1",
  });

  async function handleCreateRating() {
    if (isWriteRating === false) {
      setWriteRating(true);
    }
  }

  function handleCancleCreateRating() {
    setWriteRating(false);
  }

  function restoreData() {
    setRating(0), setComment("");
    setWriteRating(false);
  }

  async function submitCreateRating(e) {
    const token = localStorage.getItem("token");
    const dataSubmit = {
      printingId: Number(idPrinting),
      rating: rating,
      comment: comment,
    };
    try {
      const result = await axios.post(
        "/ssps/students/create-rating",
        dataSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.status === 200) {
        notifySuccess("Creating rating success!!!");
        restoreData();
      }
    } catch (err) {
      notifyError("Error from creating rating!!!");
    }
  }

  function editRating(idRating) {
    console.log(idRating);
    setRatingEdit(idRating);
  }

  function closeEdit() {
    setRatingEdit(null);
  }

  function restoreDefaultEdit() {
    setRatingEdit(null);
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
              <Box mr={1}>
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() => editRating(1)} // 1 la id rating mau, khi list danh sach cac rating thi thay bang idRating
                >
                  <Box mr={1}>
                    <EditIcon />
                  </Box>
                  Edit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button variant="contained" onClick={handleCreateRating} size="small">
          <RateReviewIcon />
          <Box ml={1}>Create rating</Box>
        </Button>
        {isWriteRating && (
          <>
            <Box sx={{ display: "flex", my: 3, backgroundColor: "" }}>
              <Box
                sx={{
                  justifyContent: "center",
                  alignSelf: "flex-start",
                  ml: 2,
                  opacity: "90%",
                }}
              >
                <AccountCircleIcon sx={{ opacity: "80%", fontSize: "2.8em" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mx: 1,
                  flexDirection: "column",
                  flexGrow: "0.9",
                }}
              >
                <Box display={"flex"}>
                  <Box mr={1} mb={1}>
                    Rating:
                  </Box>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(_, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={2}
                    size="small"
                    fullWidth
                    placeholder="Comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ alignSelf: "flex-end", mt: 1, display: "flex" }}>
                  {/* Cancle create rating */}
                  <Box sx={{ mr: 1 }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancleCreateRating}
                    >
                      <Box sx={{ mr: 1 }}>
                        <img
                          src={cancleIcon}
                          alt="cancle icon"
                          width={"20px"}
                        />
                      </Box>
                      Cancle
                    </Button>
                  </Box>
                  {/* Submit create rating */}
                  <Box>
                    <Button variant="outlined" onClick={submitCreateRating}>
                      <Box sx={{ mr: 1 }}>
                        <img
                          src={submitIcon}
                          alt="submit icon"
                          width={"20px"}
                        />
                      </Box>
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}
        {ratingEdit !== null && (
          <>
            <EditRatingPopUp
              open={ratingEdit !== null ? true : false}
              closeEdit={closeEdit}
              data={ratingData}
              restoreDefault={restoreDefaultEdit}
            />
          </>
        )}
      </section>
    </>
  );
}
export { RatingPageStudent };
