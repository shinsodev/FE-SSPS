import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import submitIcon from "../../assets/img/send.png";
import cancleIcon from "../../assets/img/cancle.png";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../../services/customize-axios";
import { notifySuccess } from "../../components/Notification/NotifySuccess";
import { notifyError } from "../../components/Notification/NotifyError";
import EditRatingPopUp from "./PopUpEditRating";
import { deleteRatingStudents } from "../../services/UserService";
import { getStudentRatingsByPrintingLogId } from "../../services/UserService";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
function RatingPageStudent() {
  const { idPrinting } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isWriteRating, setWriteRating] = useState(false);
  const [ratingEdit, setRatingEdit] = useState(null);
  const [ratingData, setRatingData] = useState([])
  const [ratingSelected, setRatingSelected] = useState();
  const [page,setPage] = useState(0);
  const [totalPages,setTotalPages] = useState(0);
  const handlePageClick = (event) => {
    setPage(event.selected);
  };
  //   idRating: 4,
  //   rating: 4,
  //   comment:
  //     "rating 1rating 1rating 1rating  1rating 1rating 1rating 1ratinng 1rating  1rating 1rating 1rating 1rating  1",
  // });
  // int id;
  // int rating;
  // String comment;
  // Long printingLogId;
  // Long documentId;
  // String studentName;
  // String studentEmail;
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
        fetchStudentRatingsByPrintingLogId();
        restoreData();
      }
    } catch (err) {
      console.log(err.message);
      notifyError(
        "You have submitted receiving file and cannot create rating!!!"
      );
    }
  }

  function editRating(ratingItem) {
    console.log(ratingItem)
    setRatingEdit(ratingItem.id);
    setRatingSelected(ratingItem);
  }

  async function deleteRatingData(idRating) {
    try {
      await deleteRatingStudents(idRating);
      fetchStudentRatingsByPrintingLogId();
    } catch (err) {
      console.log(err.message);
    }
  }

  function closeEdit() {
    setRatingEdit(null);
  }

  function restoreDefaultEdit() {
    setRatingEdit(null);
  }

  const fetchStudentRatingsByPrintingLogId = async ()  => {
    const token = localStorage.getItem('token');
    const response = await getStudentRatingsByPrintingLogId(token, idPrinting, page, 3);
    setTotalPages(response.data.totalPages);
    console.log(response)
    setRatingData(response.data.result);
  }

  useEffect(()=>{

    fetchStudentRatingsByPrintingLogId();
  },[page])

  return (
    <>
      <section className="p-8">
        <div>
          <h2 className="font-medium text-3xl text-center">Rating page</h2>
        </div>
        <hr className="my-5" />
        <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={handleCreateRating} size="small">
          <RateReviewIcon />
          <Box ml={1}>Create rating</Box>
        </Button>
  {/* Loop through all ratings */}
  {ratingData && ratingData.length > 0 ? (
    ratingData.map((ratingItem) => (
      <Box
        key={ratingItem.id} // Ensure a unique key for each item
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
            <Rating name="simple-controlled" value={ratingItem.rating} readOnly />
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
              {ratingItem.comment || "No comment"}
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
                onClick={() => editRating(ratingItem)} // Use the id from the ratingItem
              >
                <Box mr={1}>
                  <EditIcon />
                </Box>
                Edit
              </Button>
            </Box>
            <Box>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteRatingData(ratingItem.id)} // Use the id from the ratingItem
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
    ))
  ) : (
    <Typography variant="body1" sx={{ textAlign: "center", my: 3 }}>
      No ratings available.
    </Typography>
  )}
</Box>

        
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
              data={ratingSelected}
              restoreDefault={restoreDefaultEdit}
              reloadData={() => fetchStudentRatingsByPrintingLogId()}
            />
          </>
        )}
        <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT →"
        onPageChange={handlePageClick}
        forcePage={page}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="← PREVIOUS"
        className="flex space-x-2 items-center justify-center my-8"
        pageClassName="page-item"
        pageLinkClassName="page-link px-4 py-2 hover:bg-gray-900/10 rounded-md shadow-2xl"
        activeLinkClassName="active bg-black text-white" // Active page style
        previousClassName="page-item"
        previousLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        nextClassName="page-item"
        nextLinkClassName="page-link hover:bg-gray-900/10 px-4 py-2 rounded-md"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        disabledLinkClassName="text-gray-400 cursor-not-allowed"
        containerClassName="pagination"
      />
      </section>
    </>

  );
}
export { RatingPageStudent };
