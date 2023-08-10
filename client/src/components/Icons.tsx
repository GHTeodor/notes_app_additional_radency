import {FC} from 'react';
import {AssignmentTwoTone, PsychologyAltTwoTone, TipsAndUpdatesTwoTone, FormatQuoteTwoTone, BubbleChartTwoTone} from '@mui/icons-material';

interface IProps {
    category: string;
}

const Icons: FC<IProps> = ({category}) => {
    const categoryList = ["Task", "Random Thought", "Idea", "Quote"];

    return (
        <>
            {category === "Task" && <AssignmentTwoTone/>}
            {category === "Random Thought" && <PsychologyAltTwoTone/>}
            {category === "Idea" && <TipsAndUpdatesTwoTone/>}
            {category === "Quote" && <FormatQuoteTwoTone/>}
            {!categoryList.includes(category) && <BubbleChartTwoTone/>}
        </>
    );
};

export {Icons};