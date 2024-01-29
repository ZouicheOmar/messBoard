/** @format */

import useCardsState from '@/context/CardStore'

const usePositions = () => {
    const {idList, updatePosition} = useCardsState()

    const updatePositions = () => {
        const board = document.getElementById('board')
        const cards = board.children
        const board_rect = board.getBoundingClientRect()
        const {top: board_top, left: board_left} = board_rect
        for (let item = 0; item < cards.length; item++) {
            const card = cards[item]
            const {id} = card
            if (idList.includes(id)) {
                const {top, left} = card.getBoundingClientRect()
                const position = {
                    top: top - board_top,
                    left: left - board_left,
                }
                // const position = {
                //     top: top,
                //     left: left,
                // }
                updatePosition(id, position)
            }
        }
    }

    return updatePositions
}

export default usePositions
