import { useState } from "react"
import classes from './StarComponent.module.scss'
export const StarComponent = () => {
    const descriptions = ["We're sorry to hear that you had a bad experience. We would like to learn more about what happened and how we can make things right.",
        "We apologize for the inconvenience you experienced. We appreciate your feedback and would like to work with you to address any issues.",
        "Thank you for your feedback. We're sorry to hear that your experience wasn't perfect. We would love to hear more about your concerns to see how we can improve",
        "Thank you for your positive feedback! We're glad to know that you had a great experience and we appreciate your support.",
        "Excellent! We're thrilled to hear you had such a positive experience. Thank you for choosing our platform."
    ]
    const [description, setDescription] = useState('Please provide a rating');
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    const getStarClass = (index: number) => {
        let className = 'fas fa-star';
        if(rating >= index + 1 || hovered > index + 1) {
            className+= ` ${classes.filled}`
        }else if (rating >= index + 0.5){
            className+= ` ${classes.halfFilled}`
        } 
        
        if(hovered > index + 1) className +=` ${classes.hovered}`;
        return className;
    };

    return (
        <div className={classes.content}>
            <div className={classes.ratingCard}>
                <h2>How many stars would you give to our site?</h2>
                <div className={classes.stars}>
                {Array.from({ length: 5 }, (_, index) => (
                        <i
                            key={index}
                            // className={`fas fa-star ${rating >= index + 1 ? 'filled' : ''} ${hovered >= index + 1 ? 'hovered' : ''}`}
                            className={getStarClass(index)}
                            onClick={(e) => {
                                const target = e.currentTarget; // Use currentTarget instead of target
                                const rect = target.getBoundingClientRect(); // Get the bounding rectangle of the element
                                const clickPosition = e.clientX - rect.left; // Get the relative click position within the element
                                const isHalf = clickPosition < target.offsetWidth / 2; // Check if it's a half click
                                const newRating = index + (isHalf ? 0.5 : 1); // Assign 0.5 if clicked on the left half
                                setRating(newRating);
                                setDescription(descriptions[Math.ceil(newRating) -1 ]); // Update description
                            }}
                            onMouseEnter={() => setHovered(index + 1)}
                            onMouseLeave={() => setHovered(0)}
                        ></i>
                    ))}

                </div>
                <div className={classes.description}>
                    <p>{description}{rating} {hovered}</p>
                </div>
            </div>
        </div>
    )
}