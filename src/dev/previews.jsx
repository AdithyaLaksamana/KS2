import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import AddGrup from "../Component/AddGrup";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/AddGrup">
                <AddGrup/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews