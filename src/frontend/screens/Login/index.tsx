import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Runner from './components/Runner'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { ReactComponent as HeroicLogo } from 'frontend/assets/heroic-icon.svg'
import { ReactComponent as EpicLogo } from 'frontend/assets/epic-logo.svg'
import { ReactComponent as GOGLogo } from 'frontend/assets/gog-logo.svg'

import { LanguageSelector, UpdateComponent } from '../../components/UI'
import { FlagPosition } from '../../components/UI/LanguageSelector'
import SIDLogin from './components/SIDLogin'
import ContextProvider from '../../state/ContextProvider'

export default function NewLogin() {
  const { epic, gog } = useContext(ContextProvider)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showSidLogin, setShowSidLogin] = useState(false)
  const [isEpicLoggedIn, setIsEpicLoggedIn] = useState(Boolean(epic.username))
  const [isGogLoggedIn, setIsGogLoggedIn] = useState(Boolean(gog.username))

  const loginPromptString = t(
    'login.message',
    'Choose the Platform. You can login to more than one platform at the same time.'
  )

  useEffect(() => {
    setLoading(false)
  }, [epic, gog])

  useEffect(() => {
    setIsEpicLoggedIn(Boolean(epic.username))
    setIsGogLoggedIn(Boolean(gog.username))
  }, [epic.username, gog.username, t])

  return (
    <div className="loginPage">
      {loading && (
        <div>
          <UpdateComponent />
        </div>
      )}
      {showSidLogin && (
        <SIDLogin
          backdropClick={() => {
            setShowSidLogin(false)
          }}
        />
      )}
      <div className="loginBackground"></div>

      <div className="loginContentWrapper">
        <div className="runnerList">
          <div className="runnerHeader">
            <HeroicLogo className="runnerHeaderIcon" />
            <div className="runnerHeaderText">
              <h1 className="title">Heroic</h1>
              <h2 className="subtitle">Games Launcher</h2>
            </div>
            {!loading && (
              <LanguageSelector flagPossition={FlagPosition.PREPEND} />
            )}
          </div>
          <p className="runnerMessage">{loginPromptString}</p>
          <div className="runnerGroup">
            <Runner
              class="epic"
              loginUrl="/loginweb/legendary"
              icon={() => <EpicLogo />}
              isLoggedIn={isEpicLoggedIn}
              user={epic.username}
              logoutAction={epic.logout}
              alternativeLoginAction={() => {
                setShowSidLogin(true)
              }}
            />
            <Runner
              class="gog"
              icon={() => <GOGLogo />}
              loginUrl="/loginweb/gog"
              isLoggedIn={isGogLoggedIn}
              user={gog.username}
              logoutAction={gog.logout}
            />
          </div>

          {(epic.username || gog.username) && (
            <button onClick={() => navigate('/')} className="goToLibrary">
              {t('button.go_to_library', 'Go to Library')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
