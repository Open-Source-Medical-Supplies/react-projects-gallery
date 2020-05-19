import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faChevronUp,
  faChevronDown,
  faBowlingBall,
  faLemon,
  faFighterJet,
  faQuidditch,
  faHandshake
} from '@fortawesome/free-solid-svg-icons'

const initFabLib = () => library.add(
  faChevronUp,
  faChevronDown,
  faBowlingBall,
  faLemon,
  faFighterJet,
  faQuidditch,
  faHandshake
);

export default initFabLib;
