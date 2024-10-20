import { useState } from "react"
import classes from './SortableList.module.scss'
import Select from "react-select";
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from "../../Components/StrictModeDroppable/StrictModeDroppable";
interface OptionType {
    value: string;
    label: string;
}

const initialSkills = ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'vue.js', 'Angular', 'NodeJs', 'ReactJs', 'Nextjs'].map((item) => ({ value: item, label: item }));
const dummySkills = ['HTML', 'CSS', 'Bootstrap', 'Javascript'].map((item) => ({ value: item, label: item }));

export const SortableListComponent = () => {
    const [availableSkills, setAvailableSkills] = useState<OptionType[]>(initialSkills);
    const [suggestedSkills, setSuggestedSkills] = useState<OptionType[]>(dummySkills);
    const [selectedSkills, setSelectedSkills] = useState<OptionType[]>([]);
    console.log(initialSkills);
    const onSkillSelect = (option: any) => {
        setSelectedSkills([...selectedSkills, option]);
        setAvailableSkills(availableSkills.filter((item) => item.value !== option.value));
        setSuggestedSkills(suggestedSkills.filter((item) => item.value !== option.value));
    }

    // Function to handle drag and drop reordering
    const handleOnDragEnd = (result: any) => {
        if (!result.destination) return;

        const items = Array.from(selectedSkills);
        const [reorderedItem] = items.splice(result.source.index, 1); // Remove the dragged item
        items.splice(result.destination.index, 0, reorderedItem); // Insert it in the new position

        setSelectedSkills(items); // Update the state with the reordered array
        console.log(result);
    };

    const selectStyle = {
        control: (styles: any) => ({ ...styles, backgroundColor: '#e3e5f1', color: 'white', width: '75%' }),
        menu: (styles: any) => {
            return {
                ...styles,
                width: '75%',
            }
        }
    }

    const onSkillRemove = (skill) => {
        console.log(skill);
        setAvailableSkills([...availableSkills, skill]);
        setSelectedSkills(selectedSkills.filter((item) => item.value !== skill.value));
    }

    return <div className={classes.content}>
        <h1>Select your top 5 tech skills</h1>
        <div className={classes.cardContent}>
            <div className={classes.slectedList}>
                <DragDropContext onDragEnd={handleOnDragEnd} >
                    <StrictModeDroppable droppableId="SkillList" >
                        {(provided) => (
                            <ul
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {
                                    selectedSkills.length > 0 ? (selectedSkills.map((item, index) => {
                                        return <Draggable key={item.value} draggableId={item.value} index={index}>
                                            {
                                                (provided) => (
                                                    <li className={classes.selectedOptions} id={`${index}`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>{index + 1}. {item.value}<i className="fa fa-xmark" onClick={() => onSkillRemove(item)}></i></li>
                                                )
                                            }
                                        </Draggable>
                                    })) : (<li className={classes.noSkill}>No Skills Selected</li>)
                                }
                                {provided.placeholder}
                                <li>
                                    <Select<OptionType> styles={selectStyle} placeholder={'Add Skill'} options={availableSkills} onChange={onSkillSelect} />

                                </li>
                            </ul>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            </div>
            <div className={classes.suggestedList}>
                <h3>Suggested Skills</h3>
                <ul>
                    {
                        suggestedSkills.map((skill, index) => {
                            return <li id={`${index}`} onClick={() => onSkillSelect(skill)}>{skill.value}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
}