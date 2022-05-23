import { CoursePart } from "../data/courseParts";
import { assertNever } from "../utils";

type PartProps = {
    coursePart: CoursePart
}

const Part = (props: PartProps) => {
    const coursePart = props.coursePart;
    const renderPart = () => {
        switch (coursePart.type) {
            case "normal":
                return (
                    <div>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <p>
                            <i>
                            {coursePart.description}
                            </i>
                        </p>
                    </div>
                )
            case "groupProject":
                return (
                    <div>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <p>
                            project exercises {coursePart.groupProjectCount}
                        </p>
                    </div>
                )
            case "submission":
                return (
                    <div>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <p>
                            <i>
                            {coursePart.description}
                            </i>
                        </p>
                        <p>
                            submit to {coursePart.exerciseSubmissionLink}
                        </p>
                    </div>
                )
            case "special":
                return (
                    <div>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <p>
                            <i>
                            {coursePart.description}
                            </i>
                        </p>
                        <p>
                            required skills: {coursePart.requirements.map(requirement => `${requirement} `)}
                        </p>
                    </div>
                )
            default:
                return assertNever(coursePart)
        }
    };

    return (
        <>
            {renderPart()}
        </>
    );
}

export default Part;