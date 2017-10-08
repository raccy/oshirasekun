import {createAction} from 'redux-actions'

# Mode
export ENABLE_DEBUG_MODE = 'ENABLE_DEBUG_MODE'
export enableDebugMode = createAction(ENABLE_DEBUG_MODE)

# Config
export CONFIG_LOAD = 'CONFIG_LOAD'
export configLoad = createAction(CONFIG_LOAD)

# Auth
export AUTH_SETUP = 'AUTH_SETUP'
export authSetup = createAction(AUTH_SETUP)

export LOGIN = 'LOGIN'
export login = createAction(LOGIN)

export LOGIN_START = 'LOGIN_START'
export loginStart = createAction(LOGIN_START)

export LOGIN_DONE = 'LOGIN_DONE'
export loginDone = createAction(LOGIN_DONE)

# News
export NEWS_SETUP = 'NEWS_SETUP'
export newsSetup = createAction(NEWS_SETUP)

export NEWS_LOAD = 'NEWS_LOAD'
export newsLoad = createAction(NEWS_LOAD)
