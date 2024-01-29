/** @format */

import {useState} from 'react'
import {motion} from 'framer-motion'
import {Badge} from '../ui/badge'

const LIST = [
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
    'javascript',
]

const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 40,
}

const BadgeGroup = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <motion.div
            className={`flex ${
                toggle && 'flex-col space-x-0 space-y-1 '
            } justify-start space-x-[-4.5rem]  relative bg-black  rounded w-1/2 h-12 mt-4 p-2`}
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
        >
            {LIST.map((item, index) => {
                return (
                    <motion.div
                        className=" w-fit h-fit *:select-none *:border-white *:bg-indigo-800"
                        style={{
                            marginLeft: toggle ? index.toString() + 'rem' : '',
                            zIndex: LIST.length - index,
                        }}
                        layout
                        transition={spring}
                    >
                        <Badge key={index} variant="outline" className={``}>
                            {item}
                        </Badge>
                    </motion.div>
                )
            })}
        </motion.div>
    )
}

export default BadgeGroup
