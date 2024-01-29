/** @format */
import {useState} from 'react'
import {Button} from '../ui/button'

const ZoomTest = (props) => {
    const {x, y, z, d} = props
    const [zoom, setZoom] = useState(0.9)

    const handleWheel = (e) => {
        console.log('zooom', zoom)
        if (e.ctrlKey) {
            if (e.deltaY > 0) {
                if (zoom <= 0.9) {
                    const z = zoom + 0.1
                    setZoom(z)
                }
            } else if (e.deltaY < 0) {
                const z = zoom >= 0.3 ? zoom - 0.1 : zoom
                setZoom(z)
            } else {
                return
            }
        } else {
            return
        }
    }

    const handleReset = () => setZoom(1)

    return (
        // <div
        //     id="ZoomTest"
        //     className="top-[2rem] left-[20rem] w-[1024px] h-[686px] p-2 flex gap-2 bg-cyan-950 ring-[1px] ring-neutral-600 rounded transition-all "
        //     style={{
        //         transform: `translate(${x}px,${y}px) scale(${z})`,
        //         transition: `transform 10ms linear`,
        //     }}
        // >
        //     <div className="w-[10rem] h-[10rem] bg-cyan-900 rounded ring-[1px] ring-neutral-600">
        //         <p>some div</p>
        //     </div>
        //     <div className="w-[10rem] h-[10rem] bg-cyan-900 rounded ring-[1px] ring-neutral-600">
        //         <p>some div</p>
        //     </div>
        //     <div className="w-[10rem] h-[10rem] bg-cyan-900 rounded ring-[1px] ring-neutral-600">
        //         <p>some div</p>
        //     </div>
        //     <div className="w-[10rem] h-[10rem] bg-cyan-900 rounded ring-[1px] ring-neutral-600">
        //         <p>some div</p>
        //     </div>
        // </div>
        <>
            <Button variant="outline" onClick={handleReset}>
                reset
            </Button>
            <div
                className="relative p-2 mt-[2rem] ml-[20rem] w-[512px] h-[343px] overflow-scroll bg-black"
                onWheel={handleWheel}
            >
                <div
                    className=" w-[1024px] h-[686px] bg-emerald-900"
                    style={{
                        transform: `scale(${zoom})`,
                    }}
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Recusandae accusamus corrupti quae sapiente cumque.
                        Obcaecati debitis at nesciunt, unde id aut mollitia.
                        Aperiam soluta illum ullam sed id delectus voluptas.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ZoomTest
