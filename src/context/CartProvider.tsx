export type CartItemType = {
  sku: string
  name: string
  price: number
  quantity: number
}

type CartStateType = {
  cart: CartItemType[]
}

const initCartState: CartStateType = { cart: [] }

const ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof ACTION_TYPE

export type ReducerAction = {
  type: string,
  payload?: CartItemType
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
  switch (action.type) {
    case ACTION_TYPE.ADD: {
      if (!action.payload) throw new Error("action payload missing")

      const { sku, name, price } = action.payload

      // Me da los productos diferentes al que agrego
      const filteredCart: CartItemType[] = state.cart.filter(item => item.sku !== sku)

      // Busco al producto que quiero agregar para aumentarle la cantidad (si es que existe)
      const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

      // Incremento la cantidad de ser necesario o la establezco en 1
      const quantity: number = itemExists ? itemExists.quantity + 1 : 1

      return {
        ...state,
        cart: [
          ...filteredCart, 
          
          {
            sku,
            name,
            price,
            quantity
          }
        ]
      }
    }

    case ACTION_TYPE.REMOVE: {

    }

    case ACTION_TYPE.QUANTITY: {

    }

    case ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] }
    }

    default: return state
  }
}