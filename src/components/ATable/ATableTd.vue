<script>
export default {
  name: 'ATableTd',

  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    header: {
      type: Object,
      default() {
        return {};
      },
    },
    rowHovered: {
      type: Boolean,
      default: false,
    },
    toggleRowHover: {
      type: Function,
      default() {},
    },
  },

  data() {
    return {
      maxLength: 400,
    };
  },

  computed: {
    colTitle() {
      return this.getMessageByKey(this.header.title || '');
    },

    getAlign() {
      const text = 'text-';
      return (this.header.dataAlign) ? (text + this.header.dataAlign) : '';
    },

    getHeaderKey() {
      return this.header.key || '';
    },

    getTextContent() {
      return this.item[this.getHeaderKey] || '';
    },

    getClasses() {
      const classes = this.header.classes || '';
      const align = this.getAlign || '';
      return `${align} ${classes}`;
    },

    getShortTextContent() {
      const textContentInner = this.getTextContent || '';
      if (textContentInner.length > this.maxLength) {
        return `${textContentInner.substr(0, this.maxLength - 1)}...`;
      }
      return textContentInner;
    },

    getCellTitle() {
      const textContentInner = this.getTextContent || '';
      if (textContentInner.length > this.maxLength) {
        return this.getTextContent;
      }
      return '';
    },
  },

  render(createElement) {
    let component = '';
    let params = {};
    const attrs = Object.assign(
      {},
      {
        'data-th': this.colTitle || '',
        class: this.getClasses,
      },
    );
    if (this.header.useComponent) {
      component = this.header.useComponent;
      params = {
        props: {
          item: this.item,
          value: this.getTextContent,
          header: this.header,
          rowHovered: this.rowHovered,
          toggleRowHover: this.toggleRowHover,
        },
        attrs,
      };
    } else {
      component = 'td';
      const divAttr = {
        attrs: {
          title: this.getCellTitle,
        },
      };
      params = {
        attrs,
      };
      return createElement(
        component,
        params,
        [
          createElement('span', divAttr, this.getShortTextContent),
        ],
      );
    }
    return createElement(
      component,
      params,
    );
  },
};
</script>
