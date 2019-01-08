import React from 'react'
import { Link } from 'react-router'
import MailTo from 'react-mailto'
import NavIcon from './navicon.component'
import { hideLink } from '../../utils/website.utils'

/**
 * @author Skylar Kong
 *
 */

const trustLogo = require('../../images/luotettava_kumppani_logo.png')

const Footer = () => (
  <footer className="dashboard-footer">
    <div className="dashboard-footer-info">
      <div className="row">
        <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <h5>KASSAVIRTANEN</h5>
          <ul>
            <li>Kassavirtanen Oy</li>
            <li>Salomonkatu 17 B,</li>
            <li>00100 HELSINKI</li>
            <li>Y-tunnus: 2803711-2</li>
          </ul>
        </article>
        <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <h5>NAVIGOI</h5>
          <ul>
            <li>
              <Link to="/">Etusivu</Link>
            </li>
            <li>
              <Link to="hinnasto">Hinnasto</Link>
            </li>
            <li>
              <Link to="yrityksille">Kevytyrittäjyys</Link>
            </li>
            <li>
              <Link to="faq">Usein kysyttyä</Link>
            </li>
            <li>
              <Link to="yhteystiedot">Yhteystiedot</Link>
            </li>
          </ul>
        </article>
        <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <h5>ALOITA KEVYTYRITTÄJYYS</h5>
          <ul>
            <li>
              <Link to="/">Rekisteröidy</Link>
            </li>
            <li>
              <Link to="yhteystiedot">Yhteystiedot</Link>
            </li>
          </ul>
        </article>
        <article className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <h5>ASIAKASPALVELU</h5>
          <ul>
            <li>Puh. 020 734 6905</li>
            <li>
              <MailTo email="asiakaspalvelu@kassavirtanen.fi">
                asiakaspalvelu@kassavirtanen.fi
              </MailTo>
            </li>
            <li>
              <a onClick={hideLink}>Kassavirtanen Käyttöohje</a>
            </li>
          </ul>
        </article>
      </div>
      <div className="row">
        <div className="dashboard-footer-some">
          <article>
            <ul className="nav nav-pills nav-justified ">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/kassavirtanen.fi/?modal=admin_todo_tour"
                  target="_blank"
                >
                  <NavIcon
                    sectionClass="dashboard-footer-icon"
                    name="facebook-official"
                    size="2x"
                  />
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://twitter.com/kassavirtanen"
                  target="_blank"
                >
                  <NavIcon
                    sectionClass="dashboard-footer-icon"
                    name="twitter"
                    size="2x"
                  />
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/kassavirtanen/"
                  target="_blank"
                >
                  <NavIcon
                    sectionClass="dashboard-footer-icon"
                    name="instagram"
                    size="2x"
                  />
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/company/kassavirtanen/"
                  target="_blank"
                >
                  <NavIcon
                    sectionClass="dashboard-footer-icon"
                    name="linkedin"
                    size="2x"
                  />
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
      <div className="row">      
        <img          
          className='dashboard-footer-trustBrand'
          src={trustLogo}
          alt="luotettava_kumppani_laskutuspalvelu_yrittäjille"
        />      
      </div>      
      <div className="dashboard-footer-sign">
        <p> &copy; Kassavirtanen 2019</p>
      </div>
    </div>
  </footer>
)

export default Footer