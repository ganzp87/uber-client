// styled-components.ts
import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"

interface IThemeInterface {
	blueColor: string
	greyColor: string
}

const {
	default: styled,
	css,
	createGlobalStyle,
	ThemeProvider,
	keyframes
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>

export { css, ThemeProvider, createGlobalStyle, keyframes }
export default styled
