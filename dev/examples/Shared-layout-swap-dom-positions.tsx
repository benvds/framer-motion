import React, {useState} from "react"
import {motion} from "framer-motion"

const targets = ['a'] as const;
const subjects = ['x', 'y', 'z'] as const;

// type TTarget = typeof targets[number];
type TSubject = typeof subjects[number];


const Target = ({id, children}: any) => (
    <div key={id} id={id}
         style={{
             backgroundColor: 'white',
             padding: '25px',
             border: '3px dotted #ccc'
         }}
    >
        <div>
            target {id}
        </div>
        {children}
    </div>

);

const Subject = ({id, onTap}: any) => (
    <motion.div layoutId={id} style={{cursor: 'pointer',}} onTap={onTap}>
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '7.5rem',
                height: '5rem',
                backgroundColor: 'white',
                border: '3px dotted #ccc'
            }}
        >
            subject {id}
        </div>
    </motion.div>
);

const SubjectPlaceholder = ({id}: any) => (
    <motion.div layoutId={`placeholder-${id}`}>
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '7.5rem',
                height: '5rem',
                backgroundColor: '#eee',
                border: '3px dotted #ddd'
            }}
        />
    </motion.div>
);


export const App = () => {
    // const [values, setValues] = useState<Record<string, Subject>>({});
    const [value, setValue] = useState<TSubject>();
    // const [dragId, setDragId] = useState<string>();
    // const [hoverId, setHoverId] = useState<string>();

    const clearOrSetValue = (next: TSubject) => () => {
        setValue(prev => {
            const result = (prev === undefined)  ? next : undefined;
            return result;
        })
    }

    const toggleValue = () => {
        setValue(prev => {
            switch (prev) {
                case "x":
                    return 'y';
                case "y":
                    return 'z';
                case "z":
                    return undefined;
                default:
                    return 'x';
            }
        })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 25,
        }}>
            <button onClick={toggleValue}>toggle value</button>
            <div
                id="header"
                style={{
                    backgroundColor: 'white',
                    height: '11rem',
                    padding: '25px',
                    borderRadius: '25px',
                }}
            >
                {targets.map((id) => (
                    <Target key={id} id={id}>
                        {value ? <Subject id={value} onTap={clearOrSetValue(value)}/> : null}
                    </Target>
                ))}
            </div>
            <div
                id="footer"
                style={{
                    display: 'flex',
                    backgroundColor: 'white',
                    padding: '25px',
                    borderRadius: '25px',
                }}
            >
                {subjects.map((id) => (
                    value === id ? <SubjectPlaceholder key={`placeholder-${id}`} id={id}/> :
                        <Subject key={id} id={id} onTap={clearOrSetValue(id)}/>
                ))}
            </div>
        </div>
    )
}
