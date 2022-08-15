import * as React from "react"
import {useState} from "react"
import {motion} from "framer-motion"
import styled from "styled-components"

const targets = ['a'] as const;
const subjects = ['x', 'y', 'z'] as const;

type Target = typeof targets[number];
type Subject = typeof subjects[number];

/**
 * This demonstrates container components correctly animating
 * resize when children are added/removed/expanded
 */

interface ItemProps {
    isOpen: boolean
    onClick: () => void
    i: number
}

const ContentRow = styled(motion.div)`
  width: 200px;
  height: 8px;
  background-color: #999;
  border-radius: 10px;
  margin-top: 12px;
`
const List = styled(motion.div)`
  width: 240px;
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px;
`

const Container = styled(motion.div)`
  background-color: rgba(214, 214, 214, 0.5);
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0px;
  }
`

const Image = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: #666;
  border-radius: 20px;
`

function Item({onClick, i}: ItemProps) {
    const [isOpen, setIsOpen] = useState<false | number>(0)

    return (
        <Container
            layout
            onClick={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
            id={`container-${i}`}
            style={{borderRadius: 10}}
        >
            <Image id={`image-${i}`} layout/>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        layout
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <ContentRow/>
                        <ContentRow/>
                        <ContentRow/>
                    </motion.div>
                )}
            </AnimatePresence>
        </Container>
    )
}

export const App = () => {
    // const [values, setValues] = useState<Record<string, Subject>>({});
    const [value, setValue] = useState<Subject>();
    const [dragId, setDragId] = useState<string>();
    const [hoverId, setHoverId] = useState<string>();

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
                        {value ? <Subject id={value} /> : null}
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
                    value === id ? <SubjectPlaceholder id={id} /> :
                    <Subject key={id} id={id}/>
                ))}
            </div>
        </div>
    )
}

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

const Subject = ({id}: any) => (
    <motion.div layoutId={id} style={{cursor: 'pointer',}}>
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
    <motion.div layoutId={`placeholder-${id}`} >
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
