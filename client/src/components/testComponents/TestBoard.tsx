/** @format */

import {getRectById} from '@/utils/f&p'
import usePositions from '@/utils/updatePositions'
import {motion} from 'framer-motion'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

const store = create(
    immer((set, get) => ({
        position: {
            top: 0,
            left: 0,
        },
        init_position: {
            top: 0,
            left: 0,
        },
        setPosition: (data) => {
            console.log('position before update :', get().position)
            console.log('to update', data)
            set((state) => {
                state.position = data
                return
            })
            console.log('position after update :', get().position)
        },
        log: () => {
            const log = get().position
            console.log(log)
            return
        },
    }))
)

function Card() {
    const {position, init_position, setPosition} = store()

    const handleDragEnd = (e, info) => {
        console.log(info.offset)
        const new_position = {
            top: info.offset.y,
            left: info.offset.x,
        }

        setPosition(new_position)
    }

    const handleDrag = (e, info) => {
        console.log(info.offset.y, info.offset.x)
    }

    return (
        <motion.div
            id="test_card"
            drag
            style={{
                position: 'absolute',
                border: '3px dotted green',
                width: '10rem',
                height: '5rem',
                top: init_position.top + 48,
                left: init_position.left + 176,
                translateX: position.left,
                translateY: position.top,
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
        ></motion.div>
    )
}

function TestBoard() {
    const log = store((state) => state.log)
    return (
        <motion.div
            id="test_board"
            style={{
                // position: 'relative',
                border: '1px solid white',
                width: '30rem',
                height: '30rem',
            }}
        >
            <motion.div
                // drag
                style={{
                    position: 'absolute',
                    border: '3px dashed red',
                    width: '10rem',
                    height: '5rem',
                    top: 48,
                    left: 176,
                    display: 'flex',
                }}
                dragMomentum={false}
            >
                <span
                    className="vt323 bg-orange-500 text-xl text-black h-[1.15rem] leading-[1.1rem] w-[2.5rem] hover:bg-orange-400"
                    onClick={log}
                >
                    log
                </span>
            </motion.div>
            <Card />
        </motion.div>
    )
}

export default TestBoard
