const PropsTable = ({ component: { propTypes, defaultProps = {} } }) => (
	<table className="axe-markdown-props-table">
		<thead>
			<tr>
				<th>Prop Name</th>
				<th className="axe-markdown-props-table__is-required">required?</th>
				<th>type</th>
				<th>Default</th>
			</tr>
		</thead>
		<tbody>
			{
				reduce(propTypes, (rows, { info }, propName) => [
					...rows,
					<tr key={propName}>
						<td>
							{propName}
						</td>
						<td className="axe-markdown-props-table__is-required">
							{info.isRequired ? '✅' : null}
						</td>
						<td>
							{readerFriendlyPropType({ info })}
						</td>
						<td className="axe-markdown-props-table__default-props">
							{JSON.stringify(defaultProps[propName], null, 2)}
						</td>
					</tr>
				], [])
			}
		</tbody>
	</table>
);

const readerFriendlyPropType = ({ info }) => (

	info.propTypeName === 'array' && `Array`

	||

	info.propTypeName === 'bool' && `Boolean`

	||

	info.propTypeName === 'func' && `Function`

	||

	info.propTypeName === 'number' && `Number`

	||

	info.propTypeName === 'object' && `Object`

	||

	info.propTypeName === 'string' && `String`

	||

	info.propTypeName === 'symbol' && `Symbol`

	||

	info.propTypeName === 'node' && `Number || String || React.Element || Array`

	||

	info.propTypeName === 'element' && `React.Element`

	||

	info.propTypeName === 'instanceOf' && `Instance of: ${info.className}`

	||

	info.propTypeName === 'oneOf' && `One of: (${JSON.stringify(info.allowedValues, null, 3)})`

	||

	info.propTypeName === 'oneOfType' && info.allowedPropTypes.map(({ info }) => (
		readerFriendlyPropType({ info })
	)).join(' || ')

	||

	info.propTypeName === 'arrayOf' && (
		<div>
			ArrayOf: ([
			<div className="axe-markdown-props-table__inner">
				{
					readerFriendlyPropType({ info: info.allowedChildrenPropType.info })
				}
			</div>
			])
		</div>
	)

	||

	info.propTypeName === 'objectOf' && (
		<div>
			ArrayOf: ([
			<div className="axe-markdown-props-table__inner">
				{
					readerFriendlyPropType({ info: info.allowedChildrenPropType.info })
				}
			</div>
			])
		</div>
	)

	||

	info.propTypeName === 'shape' && (
		<div>
			Object with Shape: (
			{'{'}
			{
				reduce(info.objectShape, (rows, {info}, key) => [
				...rows,
				<div className="axe-markdown-props-table__inner" key={key}>
					<span className="axe-markdown-props-table__object-shape-key">{key}</span>: (
					<div className="axe-markdown-props-table__inner-next-line">
						{readerFriendlyPropType({ info })}
					</div>
				)</div>
				], [])
			}
			{'}'}
			)
		</div>
	)

	||

	info.propTypeName === 'any' && `Any`
);