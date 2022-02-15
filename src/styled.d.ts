import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		bgColor: string;
		cardColor: string;
		boardsColor: string;
		boardColor: string;
    overColor: string;
    FromThisColor: string;
		draggingCardColor: string,
	}
}