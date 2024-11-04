import { CommentInfo } from "@/bilibili-comment-search/bilibili";
import { BiliApi, BiliCommentType } from "@/bilibili-comment-search/constants";

function createButtonDivider(): HTMLElement {
  let divider = document.createElement('div');
  divider.className = 'sort-div';
  return divider;
}

function createCommentButton(text: string): HTMLElement {
  let button = document.createElement('Bilibili-Comment-Button');
  button.innerHTML = text;
  return button;
}

function createCommentSearch(): HTMLElement {
  let search = document.createElement('div');

  search.style.display = 'none';
  search.className = 'bcs-search-container';
  search.innerHTML = `
    <div class="bcs-progress"></div>
    <div class="bcs-search-main">
      <div class="bcs-search-header">
        <input type="text" id="bcs-search" placeholder="输入搜索内容" />
        <button id="bcs-search-start">开始搜索</button>
        <button id="bcs-search-stop">停止搜索</button>
      </div>
      <div class="bcs-search-options">
        <label>
          <input type="checkbox" id="bcs-search__onlyup" /> 只看up
        </label>
        <label>
          <input type="checkbox" id="bcs-search__regexp" /> 正则模式
        </label>
      </div>
    </div>
  `

  return search;
}

function createCommentsContainer(): HTMLElement {
  let container = document.createElement('div');
  container.style.display = 'none';
  container.style.marginBottom = '40px';
  return container;
}

function createComment(info: CommentInfo): HTMLElement {
  let comment = document.createElement('div');
  let noteHTML = ``;
  let pictureHTML = ``;
  let contentWithEmoteHTML = info.content.message.replace(/\[(.*?)\]/g,
    (match, text) => {
      return info.content.emote && info.content.emote.hasOwnProperty(`[${text}]`)
        ? `<img src="${info.content.emote[`[${text}]`].url}" alt="${text}" style="width:1.4em;height:1.4em;vertical-align:text-bottom;" />`
        : match;
    }
  );
  let contentWithEmoteWithAtNameToMidHTML = contentWithEmoteHTML.replace(/@(.*?) /g,
    (match, text) => {
      return info.content.at_name_to_mid && info.content.at_name_to_mid.hasOwnProperty(`${text}`)
        ? `<a href="${BiliApi.space + info.content.at_name_to_mid[`${text}`]}" style="color: #008AC5">@${text} </a>`
        : match;
    }
  );
  let upHTML = ``;

  if (info.type == BiliCommentType.note) {
    noteHTML = `
      <span class="bcs-note">
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"> <path d="M4.5 6.666666666666666C4.5 6.390526666666666 4.72386 6.166666666666666 5 6.166666666666666L11 6.166666666666666C11.276133333333334 6.166666666666666 11.5 6.390526666666666 11.5 6.666666666666666C11.5 6.942799999999999 11.276133333333334 7.166666666666666 11 7.166666666666666L5 7.166666666666666C4.72386 7.166666666666666 4.5 6.942799999999999 4.5 6.666666666666666z" fill="currentColor"></path> <path d="M4.5 9.333333333333332C4.5 9.0572 4.72386 8.833333333333332 5 8.833333333333332L8.666666666666666 8.833333333333332C8.942799999999998 8.833333333333332 9.166666666666666 9.0572 9.166666666666666 9.333333333333332C9.166666666666666 9.609466666666666 8.942799999999998 9.833333333333332 8.666666666666666 9.833333333333332L5 9.833333333333332C4.72386 9.833333333333332 4.5 9.609466666666666 4.5 9.333333333333332z" fill="currentColor"></path> <path d="M8 3.3320333333333334C6.321186666666667 3.3320333333333334 4.855333333333333 3.4174399999999996 3.820593333333333 3.5013466666666666C3.1014733333333333 3.5596599999999996 2.5440733333333334 4.109013333333333 2.48 4.821693333333333C2.4040466666666664 5.666533333333334 2.333333333333333 6.780666666666666 2.333333333333333 7.998666666666666C2.333333333333333 9.216733333333334 2.4040466666666664 10.330866666666665 2.48 11.175699999999999C2.5440666666666667 11.888300000000001 3.1015800000000002 12.437766666666665 3.8207799999999996 12.496066666666666C4.73712 12.570366666666667 5.9974066666666666 12.645866666666667 7.4425 12.659166666666666C7.7185999999999995 12.6632 7.9391333333333325 12.890333333333333 7.935099999999999 13.166433333333332C7.931033333333333 13.442533333333332 7.703899999999999 13.663066666666666 7.427833333333333 13.658999999999999C5.95654 13.645366666666668 4.67378 13.5685 3.7399533333333332 13.492799999999999C2.5416333333333334 13.395599999999998 1.5922133333333335 12.468733333333333 1.4840200000000001 11.265266666666665C1.4061199999999998 10.3988 1.3333333333333333 9.253866666666667 1.3333333333333333 7.998666666666666C1.3333333333333333 6.743533333333333 1.4061199999999998 5.598579999999999 1.4840200000000001 4.732153333333333C1.5922066666666668 3.5287466666666667 2.541373333333333 2.601793333333333 3.7397666666666667 2.50462C4.794879999999999 2.41906 6.288386666666666 2.3320333333333334 8 2.3320333333333334C9.7118 2.3320333333333334 11.2054 2.4190733333333334 12.260533333333331 2.5046399999999998C13.458866666666667 2.60182 14.4079 3.5289333333333333 14.516066666666667 4.7321333333333335C14.574466666666666 5.3813466666666665 14.6298 6.192079999999999 14.6507 7.086513333333333C14.659333333333333 7.362499999999999 14.442566666666666 7.5931999999999995 14.166599999999999 7.601799999999999C13.890633333333334 7.610433333333333 13.6599 7.3937 13.651299999999999 7.1177C13.630966666666666 6.246146666666666 13.577033333333333 5.455206666666666 13.5201 4.821666666666666C13.456033333333332 4.109073333333333 12.898633333333333 3.559673333333333 12.179733333333333 3.5013666666666663C11.144933333333334 3.417453333333333 9.678999999999998 3.3320333333333334 8 3.3320333333333334z" fill="currentColor"></path> <path d="M12.2884 8.991233333333334C12.744033333333334 8.535599999999999 13.482699999999998 8.535599999999999 13.938333333333333 8.991233333333334L14.881133333333333 9.934033333333332C15.336733333333331 10.389633333333332 15.336733333333331 11.128333333333332 14.881133333333333 11.583933333333334L12.2333 14.231766666666667C12.023933333333334 14.441166666666668 11.739866666666666 14.5588 11.4437 14.5588L10.046866666666666 14.5588C9.641866666666665 14.5588 9.313533333333332 14.230466666666667 9.313533333333332 13.825466666666665L9.313533333333332 12.428633333333332C9.313533333333332 12.132466666666666 9.431166666666666 11.848433333333332 9.6406 11.639033333333332L12.2884 8.991233333333334zM13.240633333333331 9.707766666666666C13.170333333333334 9.637433333333332 13.056399999999998 9.637433333333332 12.9861 9.707766666666666L10.366233333333334 12.327566666666666C10.3325 12.361333333333334 10.313533333333332 12.407133333333334 10.313533333333332 12.454866666666668L10.313533333333332 13.545466666666666C10.313533333333332 13.552866666666667 10.319533333333332 13.5588 10.326866666666666 13.5588L11.417466666666666 13.5588C11.465233333333332 13.5588 11.511 13.539833333333334 11.544766666666668 13.5061L14.1646 10.886266666666666C14.2349 10.815999999999999 14.2349 10.702 14.1646 10.631699999999999L13.240633333333331 9.707766666666666z" fill="currentColor"></path> </svg>
        <span style="font-size: 12px">笔记</span>
      </span>
    `;

    if (info.content.pictures) {
      pictureHTML += `<div>`;

      for (let picture of info.content.pictures) {
        if (picture.img_width && picture.img_height) {
          let w = picture.img_width, h = picture.img_height;

          if (w >= 135) {
            h = Math.round(h * 135 / w);
            w = 135;
          }

          pictureHTML += `<a href="${picture.img_src}" target="_blank">
            <img
              src="${picture.img_src}@${w}w_${h}h_1s.avif"
              width="${w}"
              height="${h}"
              style="cursor: zoom-in;"
            /></a>
          `;
        }
        else {
          pictureHTML += `<a href="${picture.img_src}" target="_blank">
            <img
              src="${picture.img_src}@135w_1s.avif"
              width="135"
              style="cursor: zoom-in;"
            /></a>
          `;
        }
      }

      pictureHTML += `</div>`;
    }
  }

  if (info.up) {
    upHTML = `<img width="24" height="24" src="${BiliApi.up}" />`
  }

  comment.className = 'bcs-container';
  comment.innerHTML = `
    <a class="bcs-avatar bcs-avatar-0" href="${BiliApi.space + info.mid}">
      <img src="${info.member.avatar}" />
    </a>
    <div class="bcs-main bcs-main-0">
      <div class="bcs-header bcs-header-0">
        <span class="bcs-uname"><a href="${BiliApi.space + info.mid}">${info.member.uname}</a></span>
        <img class="bcs-level bcs-level-0" src="${BiliApi.level + 'level_' + info.member.level + '.svg'}" />
        ${upHTML}
      </div>
      <div class="bcs-content">
        <span>${noteHTML}${contentWithEmoteWithAtNameToMidHTML}</span>
        ${pictureHTML}
      </div>
      <div class="bcs-footer bsc-footer-0">
        <div>${ info.getTime() }</div>
        <div style="margin-left: 20px;">
          <div id="bcs-id-like">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><path d="M9.283433333333333 2.0303066666666663C9.095466666666667 2.0083933333333333 8.921333333333333 2.09014 8.828166666666666 2.1991199999999997C8.424633333333333 2.6711333333333336 8.332133333333333 3.3649466666666665 8.029333333333334 3.9012466666666663C7.630633333333333 4.607453333333333 7.258833333333333 5.034486666666666 6.800866666666666 5.436006666666666C6.42382 5.7665733333333336 6.042199999999999 5.987959999999999 5.666666666666666 6.09112L5.666666666666666 13.1497C6.19062 13.1611 6.751966666666666 13.168333333333333 7.333333333333333 13.168333333333333C8.831233333333333 13.168333333333333 10.1019 13.120766666666665 10.958166666666665 13.076699999999999C11.565133333333332 13.045433333333332 12.091966666666666 12.7451 12.366466666666668 12.256733333333333C12.7516 11.571599999999998 13.2264 10.5669 13.514166666666664 9.3835C13.7823 8.2808 13.904599999999999 7.374333333333333 13.959466666666666 6.734999999999999C13.984933333333332 6.438646666666667 13.750433333333334 6.166686666666667 13.386666666666665 6.166686666666667L10.065133333333332 6.166686666666667C9.898433333333333 6.166686666666667 9.742666666666667 6.08362 9.649833333333333 5.945166666666666C9.536066666666667 5.775493333333333 9.560033333333333 5.5828533333333334 9.6312 5.403346666666666C9.783966666666666 5.013846666666666 9.983933333333333 4.432846666666666 10.062766666666667 3.90454C10.1406 3.3830066666666667 10.121599999999999 2.9639466666666667 9.917133333333332 2.57626C9.697399999999998 2.1596933333333332 9.448266666666665 2.0495266666666665 9.283433333333333 2.0303066666666663zM10.773433333333333 5.166686666666666L13.386666666666665 5.166686666666666C14.269133333333333 5.166686666666666 15.036999999999999 5.875273333333333 14.9558 6.8206C14.897 7.505533333333333 14.767199999999999 8.462733333333333 14.485833333333334 9.6198C14.170333333333334 10.917200000000001 13.6532 12.008466666666665 13.238166666666666 12.746766666666666C12.7729 13.574433333333333 11.910266666666667 14.029 11.009566666666666 14.075366666666667C10.14 14.120166666666666 8.851766666666666 14.168333333333333 7.333333333333333 14.168333333333333C5.862206666666666 14.168333333333333 4.51776 14.1231 3.565173333333333 14.079633333333334C2.4932333333333334 14.030733333333332 1.5939999999999999 13.234466666666666 1.4786599999999999 12.143466666666665C1.4028 11.426066666666665 1.3333333333333333 10.4978 1.3333333333333333 9.501666666666665C1.3333333333333333 8.588966666666666 1.3916466666666667 7.761233333333333 1.4598999999999998 7.104466666666667C1.5791666666666666 5.95696 2.5641 5.166686666666666 3.671693333333333 5.166686666666666L5.166666666666666 5.166686666666666C5.3793066666666665 5.166686666666666 5.709213333333333 5.063186666666667 6.141613333333333 4.68408C6.516733333333333 4.355193333333333 6.816366666666667 4.015666666666666 7.158533333333333 3.409613333333333C7.5023 2.8007333333333335 7.6041 2.0920066666666663 8.068066666666667 1.54932C8.372133333333332 1.1936466666666665 8.8718 0.9755333333333334 9.399233333333333 1.03704C9.949866666666665 1.10124 10.457733333333334 1.4577866666666666 10.801633333333331 2.109713333333333C11.148866666666665 2.767993333333333 11.143799999999999 3.4356599999999995 11.051833333333335 4.0520933333333335C10.993899999999998 4.44022 10.875366666666666 4.852359999999999 10.773433333333333 5.166686666666666zM4.666666666666666 13.122166666666667L4.666666666666666 6.166686666666667L3.671693333333333 6.166686666666667C3.029613333333333 6.166686666666667 2.5161533333333335 6.615046666666666 2.4545466666666664 7.207833333333333C2.3890599999999997 7.837933333333333 2.333333333333333 8.630433333333333 2.333333333333333 9.501666666666665C2.333333333333333 10.453433333333333 2.399833333333333 11.345266666666667 2.473113333333333 12.038333333333334C2.533993333333333 12.614133333333331 3.0083466666666667 13.053199999999999 3.6107466666666665 13.0807C3.9228066666666668 13.094899999999999 4.278173333333333 13.109333333333334 4.666666666666666 13.122166666666667z" fill="currentColor"></path></svg>
          </div>
          <span style="margin-left: 5px;">${info.like}</span>
        </div>
        <div style="margin-left: 20px;">
          <div id="bcs-id-unlike">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><path d="M9.283433333333333 13.9697C9.095466666666667 13.9916 8.921333333333333 13.909866666666666 8.828166666666666 13.8009C8.424633333333333 13.328866666666666 8.332133333333333 12.635066666666667 8.029333333333334 12.098766666666666C7.630633333333333 11.392566666666667 7.258833333333333 10.9655 6.800866666666666 10.564C6.42382 10.233433333333332 6.042199999999999 10.012033333333333 5.666666666666666 9.908866666666666L5.666666666666666 2.8503266666666662C6.19062 2.83892 6.751966666666666 2.8316799999999995 7.333333333333333 2.8316799999999995C8.831233333333333 2.8316799999999995 10.1019 2.87922 10.958166666666665 2.923313333333333C11.565133333333332 2.9545733333333333 12.091966666666666 3.254906666666667 12.366466666666668 3.74326C12.7516 4.428373333333333 13.2264 5.4331 13.514166666666664 6.616486666666667C13.7823 7.719199999999999 13.904599999999999 8.625666666666666 13.959466666666666 9.265C13.984933333333332 9.561366666666666 13.750433333333334 9.833333333333332 13.386666666666665 9.833333333333332L10.065133333333332 9.833333333333332C9.898433333333333 9.833333333333332 9.742666666666667 9.9164 9.649833333333333 10.054833333333333C9.536066666666667 10.224499999999999 9.560033333333333 10.417133333333332 9.6312 10.596633333333333C9.783966666666666 10.986166666666666 9.983933333333333 11.567166666666667 10.062766666666667 12.095466666666667C10.1406 12.616966666666666 10.121599999999999 13.036066666666665 9.917133333333332 13.423766666666666C9.697399999999998 13.8403 9.448266666666665 13.950466666666665 9.283433333333333 13.9697zM10.773433333333333 10.833333333333332L13.386666666666665 10.833333333333332C14.269133333333333 10.833333333333332 15.036999999999999 10.124733333333332 14.9558 9.1794C14.897 8.494466666666666 14.767199999999999 7.537266666666666 14.485833333333334 6.380213333333334C14.170333333333334 5.08278 13.6532 3.991546666666667 13.238166666666666 3.25324C12.7729 2.425586666666667 11.910266666666667 1.9710199999999998 11.009566666666666 1.9246400000000001C10.14 1.8798599999999999 8.851766666666666 1.8316866666666665 7.333333333333333 1.8316866666666665C5.862206666666666 1.8316866666666665 4.51776 1.8769066666666667 3.565173333333333 1.9203599999999998C2.4932333333333334 1.969253333333333 1.5939999999999999 2.765553333333333 1.4786599999999999 3.856533333333333C1.4028 4.573953333333333 1.3333333333333333 5.502233333333333 1.3333333333333333 6.498353333333332C1.3333333333333333 7.411033333333333 1.3916466666666667 8.238766666666667 1.4598999999999998 8.895533333333333C1.5791666666666666 10.043033333333334 2.5641 10.833333333333332 3.671693333333333 10.833333333333332L5.166666666666666 10.833333333333332C5.3793066666666665 10.833333333333332 5.709213333333333 10.936833333333333 6.141613333333333 11.3159C6.516733333333333 11.644799999999998 6.816366666666667 11.984333333333334 7.158533333333333 12.590399999999999C7.5023 13.199266666666666 7.6041 13.907999999999998 8.068066666666667 14.4507C8.372133333333332 14.806333333333331 8.8718 15.024466666666665 9.399233333333333 14.962966666666667C9.949866666666665 14.898766666666667 10.457733333333334 14.542233333333332 10.801633333333331 13.8903C11.148866666666665 13.232 11.143799999999999 12.564333333333332 11.051833333333335 11.947933333333333C10.993899999999998 11.5598 10.875366666666666 11.147633333333333 10.773433333333333 10.833333333333332zM4.666666666666666 2.8778466666666667L4.666666666666666 9.833333333333332L3.671693333333333 9.833333333333332C3.029613333333333 9.833333333333332 2.5161533333333335 9.384966666666667 2.4545466666666664 8.792166666666667C2.3890599999999997 8.162066666666666 2.333333333333333 7.369566666666666 2.333333333333333 6.498353333333332C2.333333333333333 5.546566666666667 2.399833333333333 4.654719999999999 2.473113333333333 3.96168C2.533993333333333 3.385866666666667 3.0083466666666667 2.946793333333333 3.6107466666666665 2.91932C3.9228066666666668 2.9050866666666666 4.278173333333333 2.8906666666666667 4.666666666666666 2.8778466666666667z" fill="currentColor"></path></svg>
          </div>
        </div>
        <div style="margin-left: 20px;">回复</div>
      </div>
      <div class="bcs-expander" style="display: none;">
        <span>查看 ${info.replies?.length} 条回复，</span>
        <span style="cursor: pointer;">点击查看</span>
      </div>
      <div class="bcs-replies" style="display: none;">
      </div>
    </div>
    <div class="bcs-div"></div>
  `;

  if (info.replies && info.replies.length > 0) {
    (comment.getElementsByClassName('bcs-expander')[0] as HTMLElement).style.display = 'block';
    for (let reply of info.replies) {
      comment.getElementsByClassName('bcs-replies')[0]
        .appendChild(createReplyComment(CommentInfo.fromReply(reply)));
    }
  }

  let showReplies = comment.getElementsByClassName('bcs-expander')[0] as HTMLElement;
  showReplies
    .getElementsByTagName('span')[1]
    .addEventListener('click', () => {
      let replies = comment.getElementsByClassName('bcs-replies')[0] as HTMLElement;
      let display = replies.style.display;

      if (display == 'none') {
        replies.style.display = 'block';
        showReplies.getElementsByTagName('span')[1].innerText = '点击收起';
      }
      else {
        replies.style.display = 'none';
        showReplies.getElementsByTagName('span')[1].innerText = '点击查看';
      }
    });

  return comment;
}

function createReplyComment(info: CommentInfo): HTMLElement {
  let comment = document.createElement('div');
  let contentWithEmoteHTML = info.content.message.replace(/\[(.*?)\]/g,
    (match, text) => {
      return info.content.emote && info.content.emote.hasOwnProperty(`[${text}]`)
        ? `<img src="${info.content.emote[`[${text}]`].url}" alt="${text}" style="width:1.4em;height:1.4em;vertical-align:text-bottom;" />`
        : match;
    }
  );
  let contentWithEmoteWithAtNameToMidHTML = contentWithEmoteHTML.replace(/@(.*?) /g,
    (match, text) => {
      return info.content.at_name_to_mid && info.content.at_name_to_mid.hasOwnProperty(`${text}`)
        ? `<a href="${BiliApi.space + info.content.at_name_to_mid[`${text}`]}" style="color: #008AC5">@${text} </a>`
        : match;
    }
  );
  let upHTML = ``;

  if (info.up) {
    upHTML = `<img width="24" height="24" src="${BiliApi.up}" />`
  }

  comment.className = 'bcs-container';
  comment.innerHTML = `
    <a class="bcs-avatar bcs-avatar-1" href="${BiliApi.space + info.mid}">
      <img src="${info.member.avatar}" />
    </a>
    <div class="bcs-main bcs-main-1">
      <div class="bcs-header bcs-header-1">
        <span class="bcs-content">
          <span style="position: relative; top: -8px;" class="bcs-uname"><a href="${BiliApi.space + info.mid}">${info.member.uname}</a></span>
          <img class="bcs-level bcs-level-1" src="${BiliApi.level + 'level_' + info.member.level + '.svg'}" />
          ${upHTML}
          <span style="position: relative; top: -8px;">${contentWithEmoteWithAtNameToMidHTML}</span>
        </span>
      </div>
      <div class="bcs-footer bsc-footer-1">
        <div>${ info.getTime() }</div>
        <div style="margin-left: 20px;">
          <div id="bcs-id-like">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><path d="M9.283433333333333 2.0303066666666663C9.095466666666667 2.0083933333333333 8.921333333333333 2.09014 8.828166666666666 2.1991199999999997C8.424633333333333 2.6711333333333336 8.332133333333333 3.3649466666666665 8.029333333333334 3.9012466666666663C7.630633333333333 4.607453333333333 7.258833333333333 5.034486666666666 6.800866666666666 5.436006666666666C6.42382 5.7665733333333336 6.042199999999999 5.987959999999999 5.666666666666666 6.09112L5.666666666666666 13.1497C6.19062 13.1611 6.751966666666666 13.168333333333333 7.333333333333333 13.168333333333333C8.831233333333333 13.168333333333333 10.1019 13.120766666666665 10.958166666666665 13.076699999999999C11.565133333333332 13.045433333333332 12.091966666666666 12.7451 12.366466666666668 12.256733333333333C12.7516 11.571599999999998 13.2264 10.5669 13.514166666666664 9.3835C13.7823 8.2808 13.904599999999999 7.374333333333333 13.959466666666666 6.734999999999999C13.984933333333332 6.438646666666667 13.750433333333334 6.166686666666667 13.386666666666665 6.166686666666667L10.065133333333332 6.166686666666667C9.898433333333333 6.166686666666667 9.742666666666667 6.08362 9.649833333333333 5.945166666666666C9.536066666666667 5.775493333333333 9.560033333333333 5.5828533333333334 9.6312 5.403346666666666C9.783966666666666 5.013846666666666 9.983933333333333 4.432846666666666 10.062766666666667 3.90454C10.1406 3.3830066666666667 10.121599999999999 2.9639466666666667 9.917133333333332 2.57626C9.697399999999998 2.1596933333333332 9.448266666666665 2.0495266666666665 9.283433333333333 2.0303066666666663zM10.773433333333333 5.166686666666666L13.386666666666665 5.166686666666666C14.269133333333333 5.166686666666666 15.036999999999999 5.875273333333333 14.9558 6.8206C14.897 7.505533333333333 14.767199999999999 8.462733333333333 14.485833333333334 9.6198C14.170333333333334 10.917200000000001 13.6532 12.008466666666665 13.238166666666666 12.746766666666666C12.7729 13.574433333333333 11.910266666666667 14.029 11.009566666666666 14.075366666666667C10.14 14.120166666666666 8.851766666666666 14.168333333333333 7.333333333333333 14.168333333333333C5.862206666666666 14.168333333333333 4.51776 14.1231 3.565173333333333 14.079633333333334C2.4932333333333334 14.030733333333332 1.5939999999999999 13.234466666666666 1.4786599999999999 12.143466666666665C1.4028 11.426066666666665 1.3333333333333333 10.4978 1.3333333333333333 9.501666666666665C1.3333333333333333 8.588966666666666 1.3916466666666667 7.761233333333333 1.4598999999999998 7.104466666666667C1.5791666666666666 5.95696 2.5641 5.166686666666666 3.671693333333333 5.166686666666666L5.166666666666666 5.166686666666666C5.3793066666666665 5.166686666666666 5.709213333333333 5.063186666666667 6.141613333333333 4.68408C6.516733333333333 4.355193333333333 6.816366666666667 4.015666666666666 7.158533333333333 3.409613333333333C7.5023 2.8007333333333335 7.6041 2.0920066666666663 8.068066666666667 1.54932C8.372133333333332 1.1936466666666665 8.8718 0.9755333333333334 9.399233333333333 1.03704C9.949866666666665 1.10124 10.457733333333334 1.4577866666666666 10.801633333333331 2.109713333333333C11.148866666666665 2.767993333333333 11.143799999999999 3.4356599999999995 11.051833333333335 4.0520933333333335C10.993899999999998 4.44022 10.875366666666666 4.852359999999999 10.773433333333333 5.166686666666666zM4.666666666666666 13.122166666666667L4.666666666666666 6.166686666666667L3.671693333333333 6.166686666666667C3.029613333333333 6.166686666666667 2.5161533333333335 6.615046666666666 2.4545466666666664 7.207833333333333C2.3890599999999997 7.837933333333333 2.333333333333333 8.630433333333333 2.333333333333333 9.501666666666665C2.333333333333333 10.453433333333333 2.399833333333333 11.345266666666667 2.473113333333333 12.038333333333334C2.533993333333333 12.614133333333331 3.0083466666666667 13.053199999999999 3.6107466666666665 13.0807C3.9228066666666668 13.094899999999999 4.278173333333333 13.109333333333334 4.666666666666666 13.122166666666667z" fill="currentColor"></path></svg>
          </div>
          <span style="margin-left: 5px;">${info.like}</span>
        </div>
        <div style="margin-left: 20px;">
          <div id="bcs-id-unlike">
            <svg id="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><path d="M9.283433333333333 13.9697C9.095466666666667 13.9916 8.921333333333333 13.909866666666666 8.828166666666666 13.8009C8.424633333333333 13.328866666666666 8.332133333333333 12.635066666666667 8.029333333333334 12.098766666666666C7.630633333333333 11.392566666666667 7.258833333333333 10.9655 6.800866666666666 10.564C6.42382 10.233433333333332 6.042199999999999 10.012033333333333 5.666666666666666 9.908866666666666L5.666666666666666 2.8503266666666662C6.19062 2.83892 6.751966666666666 2.8316799999999995 7.333333333333333 2.8316799999999995C8.831233333333333 2.8316799999999995 10.1019 2.87922 10.958166666666665 2.923313333333333C11.565133333333332 2.9545733333333333 12.091966666666666 3.254906666666667 12.366466666666668 3.74326C12.7516 4.428373333333333 13.2264 5.4331 13.514166666666664 6.616486666666667C13.7823 7.719199999999999 13.904599999999999 8.625666666666666 13.959466666666666 9.265C13.984933333333332 9.561366666666666 13.750433333333334 9.833333333333332 13.386666666666665 9.833333333333332L10.065133333333332 9.833333333333332C9.898433333333333 9.833333333333332 9.742666666666667 9.9164 9.649833333333333 10.054833333333333C9.536066666666667 10.224499999999999 9.560033333333333 10.417133333333332 9.6312 10.596633333333333C9.783966666666666 10.986166666666666 9.983933333333333 11.567166666666667 10.062766666666667 12.095466666666667C10.1406 12.616966666666666 10.121599999999999 13.036066666666665 9.917133333333332 13.423766666666666C9.697399999999998 13.8403 9.448266666666665 13.950466666666665 9.283433333333333 13.9697zM10.773433333333333 10.833333333333332L13.386666666666665 10.833333333333332C14.269133333333333 10.833333333333332 15.036999999999999 10.124733333333332 14.9558 9.1794C14.897 8.494466666666666 14.767199999999999 7.537266666666666 14.485833333333334 6.380213333333334C14.170333333333334 5.08278 13.6532 3.991546666666667 13.238166666666666 3.25324C12.7729 2.425586666666667 11.910266666666667 1.9710199999999998 11.009566666666666 1.9246400000000001C10.14 1.8798599999999999 8.851766666666666 1.8316866666666665 7.333333333333333 1.8316866666666665C5.862206666666666 1.8316866666666665 4.51776 1.8769066666666667 3.565173333333333 1.9203599999999998C2.4932333333333334 1.969253333333333 1.5939999999999999 2.765553333333333 1.4786599999999999 3.856533333333333C1.4028 4.573953333333333 1.3333333333333333 5.502233333333333 1.3333333333333333 6.498353333333332C1.3333333333333333 7.411033333333333 1.3916466666666667 8.238766666666667 1.4598999999999998 8.895533333333333C1.5791666666666666 10.043033333333334 2.5641 10.833333333333332 3.671693333333333 10.833333333333332L5.166666666666666 10.833333333333332C5.3793066666666665 10.833333333333332 5.709213333333333 10.936833333333333 6.141613333333333 11.3159C6.516733333333333 11.644799999999998 6.816366666666667 11.984333333333334 7.158533333333333 12.590399999999999C7.5023 13.199266666666666 7.6041 13.907999999999998 8.068066666666667 14.4507C8.372133333333332 14.806333333333331 8.8718 15.024466666666665 9.399233333333333 14.962966666666667C9.949866666666665 14.898766666666667 10.457733333333334 14.542233333333332 10.801633333333331 13.8903C11.148866666666665 13.232 11.143799999999999 12.564333333333332 11.051833333333335 11.947933333333333C10.993899999999998 11.5598 10.875366666666666 11.147633333333333 10.773433333333333 10.833333333333332zM4.666666666666666 2.8778466666666667L4.666666666666666 9.833333333333332L3.671693333333333 9.833333333333332C3.029613333333333 9.833333333333332 2.5161533333333335 9.384966666666667 2.4545466666666664 8.792166666666667C2.3890599999999997 8.162066666666666 2.333333333333333 7.369566666666666 2.333333333333333 6.498353333333332C2.333333333333333 5.546566666666667 2.399833333333333 4.654719999999999 2.473113333333333 3.96168C2.533993333333333 3.385866666666667 3.0083466666666667 2.946793333333333 3.6107466666666665 2.91932C3.9228066666666668 2.9050866666666666 4.278173333333333 2.8906666666666667 4.666666666666666 2.8778466666666667z" fill="currentColor"></path></svg>
          </div>
        </div>
        <div style="margin-left: 20px;">回复</div>
      </div>
    </div>
  `;

  return comment;
}

function setProgress(search: HTMLElement, text: string) {
  let progress = search.getElementsByClassName('bcs-progress')[0];

  progress.innerHTML = text;
}

interface CommentSearchOptions {
  onlyup: boolean,
  regexp: boolean,
  match: string,
}

function getSearchOptions(search: HTMLElement): CommentSearchOptions {
  let onlyup = search.querySelector('#bcs-search__onlyup') as HTMLInputElement;
  let regexp = search.querySelector('#bcs-search__regexp') as HTMLInputElement;
  let match = search.querySelector('#bcs-search') as HTMLInputElement;

  return {
    onlyup: onlyup.checked,
    regexp: regexp.checked,
    match: match.value,
  };
}

export { createButtonDivider, createComment, createCommentButton, createCommentsContainer, createCommentSearch, createReplyComment, setProgress, getSearchOptions };