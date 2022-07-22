

export type IF<Condition, True, False> = Condition extends true ? True : False


export type a = IF<true, 'a', 'b'>
export type b = IF<false, 'a', 'b'>