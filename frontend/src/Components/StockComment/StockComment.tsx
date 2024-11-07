import { useCallback } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import {  commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const handleComment = useCallback((e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
        .then((res) => {
            if (res) {
                toast.success("Comment created successfully!");
            }
        })
        .catch((e) => {
            toast.warning(e);
        });
  }, [stockSymbol]);
  
  return (
    <div className="flex flex-col">
      <StockCommentForm handleComment={handleComment} />
    </div>
  );
};

export default StockComment;