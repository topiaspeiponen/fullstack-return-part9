import { CoursePart } from '../data/courseParts';
import Part from './Part';

type ContentProps = {
    courseParts: Array<CoursePart>
};

const Content = (props: ContentProps) => {
    return (
        <>
            {props.courseParts.map((part, index) => {
                return(<Part key={part.name + index} coursePart={part}/>)
            })}
        </>
    );
};

export default Content;