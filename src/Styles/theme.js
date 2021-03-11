const theme = {
  background: '#FFFEFC',
  blue: '#335DF8',
  mainBlue: '#2D5BFF',
  lightGray: '#F6F6F6',
  darkGray: '#DDDDDD',
  hoverGray: '#d8d8d8',
  crayonGreen: '#20DAB3',
  logoBlue: '#3b7fff',
  iconBlue: '#2180F6',
  white: '#FFFFFF',
  fontColor: '#333333',
  fontTitle: "'Alata', sans-serif;",
  fontContent: "'Noto Sans KR', sans-serif;",
  imgRadius: '4px',
  priorityStyle: {
    'border-radius': '5px',
    border: '0.5px solid #DDDDDD',
    padding: ' 10px 15px',
    'margin-right': '5px',
    'background-color': '${theme.white}',
  },
  cityStyle: {
    'margin-bottom': '16px',
    'font-size': '14px',
    opacity: '0.5',
  },
  modalStyle: {
    top: '0',
    width: '300px',
    height: '450px',
    'z-index': '5',
    'border-radius': '4px',
    border: '1px solid #DDDDDD',
    margin: '40px',
    'box-shadow': '20px',
    'align-self': 'center',
  },
  borderStyle: {
    border: '1px solid #DDDDDD',
  },
  widthHeightAuto: {
    width: 'auto',
    height: 'auto',
  },
  itemStyle: {
    display: 'inline-block',
    margin: '10px 10px',
    padding: '5px',
  },
  border1pxStyle: {
    border: '1px solid #DDDDDD',
  },
  categoryStyle: {
    'align-items': 'center',
    'text-align': 'center',
    'line-height': '35px',
    border: '0.5px solid ${theme.lightGray}',
    'border-radius': '17px',
    color: 'black',
    width: 'auto',
    height: 'auto',
    outline: 'none',
    border: 'none',
    fontContent: "'Noto Sans KR', sans-serif",
  },

  TagUl: {
    display: 'flex',
    width: '100%',
    'flex-wrap': 'wrap',
    'margin-bottom': '50px',
  },

  TagLi: {
    padding: '9px 14px',
    margin: '0 6px 10px 0',
    'font-size': '12px',
    'font-weight': '500',
    ' line-height': '1',
    ' background-color': '#f3f5f8',
    ' border-radius': '25px',
    ' cursor': 'pointer',
  },
  showModaStyle: {
    position: 'absolute',
    'margin-top': '200px 200px',
    'z-index': '120',
  },

  WhiteBox: {
    border: '1px solid #e1e2e3',
    ' background-color': '#ffffff',
  },

  profileContainer: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'min-height': '100vh',
    'padding-top': '50px',
    'padding-bottom': '100px',
    'background-color': '#f7f7f9',
    color: '#333333',
  },

  profileSection: {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    width: '1000px',
  },

  pageTitle: {
    width: '1000px',
    padding: '50px 0 20px',
    'font-size': '20px',
    'font-weight': '700',
  },
};

export default theme;
