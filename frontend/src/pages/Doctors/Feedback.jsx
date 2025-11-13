import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import FeedbackForm from "./FeedbackForm";

// eslint-disable-next-line react/prop-types
const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-8">
          All Reviews ({totalRating})
        </h4>

        {/* Reviews List */}
        {reviews?.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="flex justify-between items-start gap-6 mb-8 border-b border-gray-200 pb-5"
            >
              {/* Reviewer Info */}
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                  <img
                    src={review?.user?.photo || avatar}
                    alt={review?.user?.name || "User"}
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>

                <div>
                  <h5 className="text-[16px] font-bold text-primaryColor leading-6">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[14px] text-textColor leading-6">
                    {formateDate(review?.createdAt)}
                  </p>
                  <p className="text__para mt-3 text-[15px] font-medium text-textColor">
                    {review?.reviewText}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1">
                {[...Array(review?.rating || 0).keys()].map((_, idx) => (
                  <AiFillStar key={idx} className="text-primaryColor" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-textColor text-[15px] italic">
            No reviews yet.
          </p>
        )}
      </div>

      {/* Feedback Form Toggle */}
      {showFeedbackForm ? (
        <FeedbackForm />
      ) : (
        <div className="text-center">
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="btn transition-colors duration-200"
          >
            Give Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
