<template>
  <div class="article-meta">
    <a href="profile.html">
      <img src="http://i.imgur.com/Qr71crq.jpg">
    </a>
    <div class="info">
      <a href class="author">{{article.author.username}}</a>
      <span class="date">{{article.createdAt}}</span>
    </div>

    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}}
      <span class="counter">(10)</span>
    </button>
    &nbsp;
    
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{'active': article.favorited}"
      :disabled="article.favoriteDisabled"
      @click="onFavorite"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/home'
export default {
  props: ['article'],

  methods: {
    async onFavorite() {
      let article = this.article

      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>
</style>
