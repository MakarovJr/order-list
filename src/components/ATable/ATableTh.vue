<script>
export default {
  name: 'ATableTh',

  props: {
    header: {
      type: Object,
      default() {
        return {};
      },
    },
    sortParams: {
      type: Object,
      default() {
        return {};
      },
    },
    sortParamsDefault: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      sords: [
        'asc',
        'desc',
        'nosort',
      ],
    };
  },

  computed: {
    isActive() {
      return (this.sortParams.sidx === this.header.name);
    },

    getCurrentSordIndex() {
      return this.sords.indexOf(this.sortParams.sord.toLowerCase());
    },

    getNextSord() {
      return (this.isNeedResetSord || !this.sords[this.getCurrentSordIndex + 1])
        ? this.sords[0]
        : this.sords[this.getCurrentSordIndex + 1];
    },

    isNeedResetSord() {
      return (
        (this.sortParams.sidx !== this.header.name)
        || (
          this.sortParamsDefault.sidx === this.header.name
          && this.getCurrentSordIndex + 1 === (this.sords.length - 1)
        )
      );
    },

    getAlign() {
      const text = 'text-';
      return (this.header.headerAlign) ? (text + this.header.headerAlign) : '';
    },

    getOrderClass() {
      const noOrderClass = 'fa-sort';
      const ascOrderClass = 'fa-sort-asc';
      const descOrderClass = 'fa-sort-desc';
      let resultClass = noOrderClass;
      if (this.sortParams.sidx === this.header.name) {
        if (this.sortParams.sord.toLowerCase() === 'asc') {
          resultClass = ascOrderClass;
        }
        if (this.sortParams.sord.toLowerCase() === 'desc') {
          resultClass = descOrderClass;
        }
      }
      return resultClass;
    },

    getClasses() {
      const classes = this.header.classes || '';
      const align = this.getAlign;
      const sort = this.header.sortControl ? 'with-control' : '';
      return `${align} ${classes} ${sort}`;
    },
  },

  methods: {
    changeSord() {
      if (this.header.sortControl) {
        this.$emit('onChangeSort', {
          data: {
            sidx: this.header.name,
            sord: this.getNextSord,
          },
        });
      }
    },
  },

  render(createElement) {
    let component = '';
    let params = {};
    let sortControl = {};
    const attrs = {
      class: this.getClasses,
    };
    if (this.header.useHeaderComponent) {
      component = this.header.useHeaderComponent;
      params = {
        props: {
          header: this.header,
        },
        attrs,
      };
    } else {
      component = 'th';
      params = {
        attrs,
        on: {
          click: this.changeSord,
        },
      };
    }

    if (this.header.sortControl) {
      const sortControlAttr = {
        class: {
          'sort-control': true,
          fa: true,
          'fa-sort': this.getOrderClass === 'fa-sort',
          'fa-sort-asc': this.getOrderClass === 'fa-sort-asc',
          'fa-sort-desc': this.getOrderClass === 'fa-sort-desc',
          'active-ctrl': this.isActive,
        },
      };
      sortControl = createElement('div', sortControlAttr, '');
    } else {
      sortControl = createElement();
    }
    return createElement(
      component,
      params,
      [
        createElement('div', {
          domProps: {
            innerHTML: this.getMessageByKey(this.header.title),
          },
          class: {
            'th-title': true,
          },
        }),
        sortControl,
      ],
    );
  },
};
</script>
