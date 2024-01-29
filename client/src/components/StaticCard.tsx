/** @format */

import {useEffect, useState, useRef} from 'react'
import useCardsState from '@/context/CardStore'

const StaticCardHeader = (props) => {
    const {title} = props

    return (
        <div className="w-full h-7 flex-none  ">
            <p className="text-sm text-start min-w-full bg-inherit ">{title}</p>
        </div>
    )

    // const {id, title} = props
    // const updateTitle = useCardsState((state) => state.updateTitle)
    // // const id = data.id

    // const [editTitle, setEditTitle] = useState(true)
    // //the log file will replace all theses previous ...
    // const [previousTitle, setPreviousTitle] = useState('')

    // const ref = useRef(null)

    // const handleTitleChange = (e) => {
    //     updateTitle(id, e.target.value)
    // }

    // const handleBlur = (e) => {
    //     updateTitle(id, e.target.value)
    // }

    // const handleKeyDown = (e) => {
    //     if (e.keyCode === 13) {
    //         setEditTitle(false)
    //     } else if (e.keyCode === 27 && previousTitle === '') {
    //         ref.current.blur()
    //     } else if (e.keyCode === 27 && previousTitle !== '') {
    //         setEditTitle(false)
    //         updateTitle(previousTitle)
    //     }
    // }

    // const handleSelect = () => {
    //     setPreviousTitle(title)
    //     setEditTitle(true)
    //     updateTitle('')
    //     setTimeout(() => {
    //         ref.current.focus()
    //     }, 50)
    // }

    // const handleDoubleClick = () => {
    //     setEditTitle(true)
    //     setTimeout(() => {
    //         const end = ref.current.value.length
    //         ref.current.focus()
    //         ref.current.setSelectionRange(end, end)
    //     }, 10)
    // }

    // {editTitle && (
    //     <>
    //         <input
    //             ref={ref}
    //             type="text"
    //             name="title"
    //             className=" bg-inherit pl-1 w-fit pr-6 text-sm border-none overflow-scroll   focus:bg-neutral-700/25 transition-colors  duration-300 focus:ring-indigo-500 focus:ring-[1px] focus:outline-none resize-none select-none"
    //             size={14}
    //             value={title}
    //             onKeyDown={handleKeyDown}
    //             onChange={handleTitleChange}
    //             placeholder={title || 'titre ici'}
    //             onBlur={handleBlur}
    //         />
    //     </>
    // )}
    // {!editTitle && (
    //     <>
    //         <p
    //             className="text-sm text-start pl-1 min-w-full bg-inherit "
    //             onDoubleClick={handleDoubleClick}
    //         >
    //             {title}
    //         </p>
    //     </>
    // )}
}

const StaticCardBody = (props) => {
    const {data} = props
    const [text, setText] = useState(data)

    // const {id, data} = props
    // const updateCard = useCardsState((state) => state.updateCard)
    // const [editText, setEditText] = useState(false)
    // const [previousText, setPreviousText] = useState('')

    // const ref = useRef(null)

    // const handleChange = (e) => {
    //     setText(e.target.value)
    // }

    // const handleKeyDown = (e) => {
    //     // if (e.keyCode === 27 && previousText === '') {
    //     //   ref.current.blur()
    //     // } else if (e.keyCode === 27 && previousText !== '') {
    //     //   setEditText(false)
    //     //   setText(previousText)
    //     //   ref.current.blur()
    //     // }
    //     if (e.keyCode === 27) {
    //         ref.current.blur()
    //         setEditText(false)
    //         // setText(previousText)
    //     }
    //     if (e.keyCode === 13 && e.shiftKey) {
    //         ref.current.blur()
    //     }
    // }

    // const handleSelect = () => {
    //     setPreviousText(text)
    //     setEditText(true)
    //     // setText('')
    //     setTimeout(() => {
    //         const end = ref.current.value.length
    //         ref.current.focus()
    //         ref.current.setSelectionRange(end, end)
    //     }, 10)
    // }

    // const handleDoubleClick = () => {
    //     setEditText(true)
    //     const timeOutCallback = () => {
    //         const end = ref.current.value.length
    //         ref.current.focus()
    //         ref.current.setSelectionRange(end, end)
    //         console.log('in timeout')
    //     }
    //     const timeOut = setTimeout(timeOutCallback, 10)
    //     clearTimeout(timeOut)
    // }

    // const handleBlur = () => {
    //     setEditText(false)
    //     updateCard(id, text)
    // }

    // <textarea
    //             ref={ref}
    //             className="w-full h-full resize-none bg-inherit px-1 pt-1  focus:bg-neutral-700/25 transition-colors  duration-300 focus:ring-indigo-500 focus:ring-[1px] focus:outline-none"
    //             placeholder="note..."
    //             value={text}
    //             onChange={handleChange}
    //             onBlur={handleBlur}
    //             // readOnly={editText ? false : true}
    //             onClick={handleDoubleClick}
    //             spellCheck={false}
    //             onKeyDown={handleKeyDown}
    //             readOnly
    //         />

    return (
        <div className="grow h-full overflow-hidden  nondrag  pt-1 min-h-full rounded-[6px]  ">
            <textarea
                className="w-full h-full resize-none bg-inherit  focus:outline-none"
                disabled
            >
                {text}
            </textarea>
        </div>
    )
}

const StaticCard = (props) => {
    const {id} = props
    const getSingleCard = useCardsState((state) => state.getSingleCard)
    const card = getSingleCard(id)

    useEffect(() => {
        console.log('single card data', card)
    }, [])

    return (
        <div
            id="left_side"
            className="w-3/5 grow  overflow-scroll ring-[1px] ring-neutral-800 rounded p-2"
            style={{
                width: 300,
                height: 300,
            }}
        >
            <StaticCardHeader id={id} title={card.title} />
            <StaticCardBody id={id} data={card.data} />
        </div>
    )
}

export default StaticCard
