
let nameSpaceRooms = null
let user = null
let roomName = ''
export const showCategory = (namespaces, userInfo) => {
  user = userInfo
  console.log(user);
  const chatCategory = document.querySelector('.sidebar__categories-list')
  chatCategory.innerHTML = ''
  chatRooms(namespaces[0].href)
  namespaces.forEach((item, index) => {
    chatCategory.insertAdjacentHTML('beforeend',
      `<li data-title='${item.title}' class="sidebar__categories-item ${index === 0 && 'sidebar__categories-item--active'}" data-category-name="all">
<span class="sidebar__categories-text">${item.title}</span>
<!-- <span class="sidebar__categories-counter sidebar__counter">3</span> -->
</li>`)
  })
}
const chatRooms = (href) => {
  if (nameSpaceRooms) {
    nameSpaceRooms.close()
  }
  nameSpaceRooms = io(`http://localhost:4003${href}`)
  nameSpaceRooms.on('connect', () => {
    nameSpaceRooms.on('namespaceRooms', (rooms) => {

      showChat(rooms)
    })
  })
}

const showChat = (rooms) => {
  const chat = document.querySelector('.sidebar__contact-list')
  chat.innerHTML = ''
  rooms.forEach(item => [
    chat.insertAdjacentHTML('beforeend', `
    <li data-room=${item.title} class="sidebar__contact-item">
                  <a class="sidebar__contact-link" href="#">
                    <div class="sidebar__contact-left">
                      <div class="sidebar__contact-left-left">
                        <img class="sidebar__contact-avatar" src="http://localhost:4003/${item.image}">
                      </div>
                      <div class="sidebar__contact-left-right">
                        <span class="sidebar__contact-title">${item.title}</span>
                        <div class="sidebar__contact-sender">
                          <span class="sidebar__contact-sender-name">Qadir Yolme :
                          </span>
                          <span class="sidebar__contact-sender-text">سلام داداش خوبی؟</span>
                        </div>
                      </div>
                    </div>
                    <div class="sidebar__contact-right">
                      <span class="sidebar__contact-clock">15.53</span>
                      <span class="sidebar__contact-counter sidebar__counter sidebar__counter-active">66</span>
                    </div>
                  </a>
                </li>
    `)
  ])
  contentChat()
}

export const activityRooms = (namespaces) => {
  const chatTitle = document.querySelectorAll('.sidebar__categories-item')
  console.log('chatTitle', chatTitle);
  chatTitle.forEach(item =>
    item.addEventListener('click', (event) => {
      const title = item.dataset.title
      const mainRooms = namespaces.find(item => item.title === title)
      chatRooms(mainRooms.href)
      const activenamespace = document.querySelector('.sidebar__categories-item--active')
      activenamespace.classList.remove('sidebar__categories-item--active')
      event.target.classList.add('sidebar__categories-item--active')

    }))
}

const contentChat = () => {
  const sidebarContactItem = document.querySelectorAll('.sidebar__contact-item')
  const chatsContainer = document.querySelector(".chat__content-main");

  sidebarContactItem.forEach(item => {


    item.addEventListener('click', event => {
      const msgInput = document.querySelector(
        ".chat__content-bottom-bar-input"
      );
      msgInput.value = "";
     
      roomName = item.dataset.room
      console.log(roomName);
      nameSpaceRooms.emit('joining', roomName)
      nameSpaceRooms.off('joining')
      nameSpaceRooms.on('roomInfo', data => {
        console.log('roomInfo', data);
        const chatContent = document.querySelector(".chat__content");
        chatContent.classList.add("chat__content--active");

        const chatHeader = document.querySelector(".chat__header");
        chatHeader.classList.add("chat__header--active");

        const chatName = document.querySelector(".chat__header-name");
        chatName.innerHTML = data.title;

        const chatProfile = document.querySelector(".chat__header-avatar");
        chatProfile.src = `http://localhost:4003/${data.image}`;
        chatsContainer.innerHTML = ''
        data.messages.forEach(item => {
          if (item.sender === user._id) {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-receiver-wrapper chat__content-wrapper">
                  <div class="chat__content-receiver">
                    <span class="chat__content-receiver-text">${item.message}</span>
                    <span class="chat__content-chat-clock">17:55</span>
                  </div>
                </div>
              `
            );
          } else {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-sender-wrapper chat__content-wrapper">
                  <div class="chat__content-sender">
                    <span class="chat__content-sender-text">${item.message}</span>
                    <span class="chat__content-chat-clock">17:55</span>
                  </div>
                </div>
              `
            );
          }
        })

        let mapElemID = null;
        data.locations.forEach(item => {
          mapElemID = Math.floor(Math.random() * 99999);
          if (item.sender === user._id) {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-receiver-wrapper chat__content-wrapper">
                  <div class="chat__content-receiver chat__content-map">
                    <div class="map-receiver" id="map-${mapElemID}"></div>
                    <span class="chat__content-chat-clock">17:55</span>
                  </div>
                </div>
              `
            );
            addLocation(`map-${mapElemID}`, item.x, item.y);
          } else {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-sender-wrapper chat__content-wrapper">
                  <div class="chat__content-sender chat__content-map">
                    <div class="map-sender" id="map-${mapElemID}"></div>
                    <span class="chat__content-chat-clock">17:58</span>
                  </div>
                </div>
              `
            );
            addLocation(`map-${mapElemID}`, item.x, item.y);

          }
        })
        data.medias.map(item => {
          if (item.sender === user._id) {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-receiver-wrapper chat__content-wrapper">
                  <div class="chat__content-receiver chat__content-map">
                    <div class="" ><img width='100%' height='100%' src='http://localhost:4003/${item.path}' /></div>
                    <span class="chat__content-chat-clock">17:55</span>
                  </div>
                </div>
              `
            );
          } else {
            chatsContainer.insertAdjacentHTML(
              "beforeend",
              `
                <div class="chat__content-sender-wrapper chat__content-wrapper">
                  <div class="chat__content-sender chat__content-map">
                  <div class="" ><img  width='100%' height='100%'src='http://localhost:4003/${item.path}' /></div>
                    <span class="chat__content-chat-clock">17:58</span>
                  </div>
                </div>
              `
            );
          }
        })
      })
      onlineUsers()
    })

  })
}

const onlineUsers = () => {
  nameSpaceRooms.on('onlineUsersCount', (count) => {
    const chatonlneUser = document.querySelector('.chat__header-status')
    chatonlneUser.innerHTML = `${count} users online`
  })
}

export const sendMassage = () => {
  const messageInput = document.querySelector('.chat__content-bottom-bar-input')
  messageInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
      const message = event.target.value
      nameSpaceRooms.emit('newMsg', { message, roomName, sender: user._id })
      event.target.value = ''
    }
  })

}
export const showMassage = () => {
  const chatsContainer = document.querySelector(".chat__content-main");
  chatsContainer.innerHTML = ''
  nameSpaceRooms.on('confirmMsg', data => {
    console.log('data', data);
    if (data.sender === user._id) {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="chat__content-receiver-wrapper chat__content-wrapper">
            <div class="chat__content-receiver">
              <span class="chat__content-receiver-text">${data.message}</span>
              <span class="chat__content-chat-clock">17:55</span>
            </div>
          </div>
        `
      );
    } else {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="chat__content-sender-wrapper chat__content-wrapper">
            <div class="chat__content-sender">
              <span class="chat__content-sender-text">${data.message}</span>
              <span class="chat__content-chat-clock">17:55</span>
            </div>
          </div>
        `
      );
    }
  })
}
let isTyping = false
let typingsetTime = null

export const userIstyping = () => {
  const messageInput = document.querySelector('.chat__content-bottom-bar-input')
  messageInput.addEventListener('keydown', (event) => {
    nameSpaceRooms.emit('isTyping', { userID: user._id, roomName, isTyping })
    if (!isTyping) {
      isTyping = true
    }
    if (typingsetTime) clearTimeout(typingsetTime)
    typingsetTime = setTimeout(() => {
      isTyping = false
      nameSpaceRooms.emit('isTyping', { userID: user._id, roomName, isTyping })

    }, 2000);

  })
  nameSpaceRooms.on('isTyping', data => {
    const headerstatus = document.querySelector('.chat__header-status')

    if (data.isTyping) {
      if (data.username !== user.username) {
        headerstatus.innerHTML = `${data.username} is typing...`
      }
    }
  })
}

export const sendLocation = () => {
  const sendLocationElem = document.querySelector(".location-icon")
  sendLocationElem.addEventListener('click', () => {
    nameSpaceRooms.emit('newLocation', {
      location: { x: 36.841781928656516, y: 54.43292097321089 },
      sender: user._id,
      roomName,
    })
  })
}

export const getLocation = () => {
  const chatsContainer = document.querySelector(".chat__content-main");
  const mapElemID = Math.floor(Math.random() * 99999);
  nameSpaceRooms.on('confirmLocation', (data) => {
    console.log('info map', data);
    if (data.sender === user._id) {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="chat__content-receiver-wrapper chat__content-wrapper">
          <div class="chat__content-receiver chat__content-map">
            <div class="map-receiver" id="map-${mapElemID}"></div>
            <span class="chat__content-chat-clock">17:55</span>
          </div>
        </div>
      `
      );
      addLocation(`map-${mapElemID}`, data.location.x, data.location.y);
    } else {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="chat__content-sender-wrapper chat__content-wrapper">
          <div class="chat__content-sender chat__content-map">
            <div class="map-sender" id="map-${mapElemID}"></div>
            <span class="chat__content-chat-clock">17:58</span>
          </div>
        </div>
      `
      );
      addLocation(`map-${mapElemID}`, data.location.x, data.location.y);
    }
  })
}

export const sendFile = () => {
  const attach = document.querySelector('#input-file')
  attach.addEventListener('change', (event) => {
    event.preventDefault()
    console.log(event.target.files);
    nameSpaceRooms.emit('newMedia',
      {
        filename: event.target.files[0].name,
        file: event.target.files[0],
        sender: user._id,
        roomName
      })
  })
}
export const getFile = () => {
  const chatsContainer = document.querySelector(".chat__content-main");

  nameSpaceRooms.on('confirmMedia', data => {
    console.log('file', data);
    if (data.sender === user._id) {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="chat__content-receiver-wrapper chat__content-wrapper">
          <div class="chat__content-receiver chat__content-map">
            <div class="" ><img  width='100%' height='100%' src='http://localhost:4003/${data.media.path}' /></div>
            <span class="chat__content-chat-clock">17:55</span>
          </div>
        </div>
      `
      );
    } else {
      chatsContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="chat__content-sender-wrapper chat__content-wrapper">
          <div class="chat__content-sender chat__content-map">
          <div class="" ><img  width='100%' height='100%' src='http://localhost:4003/${data.media.path}' /></div>
            <span class="chat__content-chat-clock">17:58</span>
          </div>
        </div>
      `
      );
    }
  })
}