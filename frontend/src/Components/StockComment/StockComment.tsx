import { useCallback, useEffect, useState } from "react";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import {  commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { toast } from "react-toastify";
import { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const [comments, setComment] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();

    const handleComment = useCallback((e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
        .then((res) => {
            if (res) {
                toast.success("Comment created successfully!");
                getComments();
            }
        })
        .catch((e) => {
            toast.warning(e);
        });
    }, [stockSymbol]);

    const getComments = useCallback(() => {
        setLoading(true);
        commentGetAPI(stockSymbol).then((res) => {
          setLoading(false);
          setComment(res?.data!);
        });
    }, [stockSymbol]);

    useEffect(() => {
        getComments();
    }, []);
  
    return (
        <div className="flex flex-col">
        {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
        <StockCommentForm handleComment={handleComment} />
        </div>
    );
};

export default StockComment;