<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <ArticleMeta :article="article"/>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr>

      <div class="article-actions">
        <ArticleMeta :article="article"/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                v-model="comment.body"
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img">
              <button class="btn btn-sm btn-primary" @click="onSendComment">Post Comment</button>
            </div>
          </form>

          <div class="card" v-for="(comment, index) in comments" :key="index">
            <div class="card-block">
              <p class="card-text">{{comment.body}}</p>
            </div>
            <div class="card-footer">
              <a href class="comment-author">
                <img :src="comment.author.image" class="comment-author-img">
              </a>
              &nbsp;
              <a href class="comment-author">{{comment.author.username}}</a>
              <span class="date-posted">{{comment.createdAt}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticelInfo, getComments, addComments } from '@/api/article'
import { mapState } from 'vuex'
import ArticleMeta from './article-meta'
import Markdownit from 'markdown-it'
export default {
  name: 'articleIndex',

  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },

  computed: {
    ...mapState(['user'])
  },

  data() {
    return {
      comment: {
        body: ''
      },

      comments: []
    }
  },

  async asyncData({ params }) {
    console.log(params)
    const { data } = await getArticelInfo(params.slug)
    const md = new Markdownit()
    let { article } = data

    article.body = md.render(article.body)

    article.favoriteDisabled = false
    return {
      article
    }
  },

  mounted() {
    this.getComments()
  },

  components: {
    ArticleMeta
  },

  methods: {
    async getComments() {
      let { data } = await getComments(this.$route.params.slug)
      this.comments = data.comments
    },

    onSendComment() {
      addComments(this.$route.params.slug, this.comment).then(() => {
        this.getComments
      })
    }
  }
}
</script>

<style>
</style>
