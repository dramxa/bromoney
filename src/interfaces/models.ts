export interface User {
  id: number
  phone: string
  login: string
  email: string | null
  country_code: string
  currency: string
  comment: string
  lang: string
}

export interface Client {
  id: number
  login: string
  shortName: string | null
  currency: {
    id: number
    name: string
    abbr: string
    desc: string
    dSums: number[]
  }
  contact: {
    phone: string
    email: null
  }
  balance: {
    amount: number
    rate: number
    amountC: number
    isFrozen: boolean
    currency: {
      name: string
      abbr: string
    }
  }
}

export interface Requisite {
  id: number
  name: string
  address: string
  addressTypeId: number
  addressType: string,
  comment: string | null
  psystem: {
    id: number
    name: string
    sysName: string
    addressType: string
    imgPath: string
  },
  currencyId: number
  isDefault: boolean
}

export interface Rates {
  buy: number
  sell: number
}

export interface Currency {
  id: number
  name: string
  abbr: string
  desc: string
  dSums?: number[]
}

export interface Psystem {
  id: number
  name: string
  sysName: string
  addressType?: string
  addressTypes?: number[]
  imgPath: string
}

export interface OperationObj {
  id: number
  operationType: string
  msid: string
  amount: number
  amountUsd: number
  currency: Currency
  psystem: Psystem
  account: string
  requisites: {
    address: string
    name: string
    addressType: string
    comment: string | null
  },
  requisitesA: {
    name: string
  },
  status: string
  chat: {
    id: number
    unread: number
  },
  endsIn: string | null
  acceptedAt: string | null
  autoconfirmAt: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface Message {
  id: number
  chatId: number
  senderType: string
  senderName: string | null
  message: string
  isRead: boolean
  attachments: Attachment[]
  waitFiles: number
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: number
  messageId: number
  filePath: string
  thumbPath: string
}

export interface Chat {
  id: number
  type: string
  name: string
  agent: {
    id: number
    name: string | null
    sex: string | null
  },
  client: {
    id: number
    login: string | null
    name: string | null
  },
  messages: Message[]
  createdAt: string | null
  updatedAt: string | null
}