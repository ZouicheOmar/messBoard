/** @format */

import useCardsState from '@/context/CardStore'
import useUiStore from '@/context/UiStore'

export default function MousePointer() {
    const {mx, my} = useUiStore()
    const {groupMode} = useCardsState()

    return (
        groupMode && (
            <div
                id="mousePointer"
                style={{
                    position: 'absolute',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    transform: `translate(${mx}px, ${my}px)`,
                    left: -10,
                    top: -10,
                    width: 20,
                    height: 20,
                }}
            ></div>
        )
    )
}
