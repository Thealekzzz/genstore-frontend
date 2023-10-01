import { Box, Typography, styled } from '@mui/material';
import { PropTypes } from "prop-types";

import infoIcon from "../../imgs/info.svg";
import doneIcon from "../../imgs/done.svg";
import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';

const iconsByStatus = {
    "Success": doneIcon,
    "Error": infoIcon,
};

const StatusField = ({ status }) => {

    return (
        <Wrapper>
            {status.status === "Loading"
                ? <LoadingSpinner />
                : <Image src={iconsByStatus[status.status] || infoIcon} alt="" />}

            <Typography>{status.message}</Typography>
        </Wrapper>
    );
};

StatusField.propTypes = {
    status: PropTypes.object,
};

export default StatusField;

const stylesByStatus = {
    "Success": {
        backgroundColor: "seagreen",
    },
    "Error": {
        backgroundColor: "tomato",
    },
    "Loading": {},
};

const Wrapper = styled(Box)(({ visible, status }) => ({
    display: visible ? "flex" : "none",
    alignItems: "center",
    gap: "10px",
    padding: "0 20px",
    minHeight: "40px",
    borderRadius: "5px",
    backgroundColor: "#4380f0",
    color: "white",
    fontWeight: "bold",
    fontSize: "12px",

    ...stylesByStatus[status],

}));

const Image = styled('img')(() => ({
    width: 20,
    height: 20,
}));
