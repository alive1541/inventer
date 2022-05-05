
import MonacoEditor from "@monaco-editor/react";
import styles from './code.module.scss'



const Editor = () => {
	return (
		<MonacoEditor
			className={styles['code-editor']}
			theme="vs-dark"
			onChange={(e?: string) => {
				console.log('e,', e)
			}}
			language="typescript"
			defaultValue={""}
			options={{
				fontSize: 32
			}}
		/>
	);
}

export default Editor