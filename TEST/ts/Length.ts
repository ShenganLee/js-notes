export type tesla = ['tesla', 'model 3', 'model X', 'model Y']
export type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

export type Length<T extends any[]> = T['length']
export type teslal = Length<tesla>
export type spaceXl = Length<spaceX>