'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      first_name: 'Jo',
      last_name: 'Do',
      username: 'example',
      password: await bcrypt.hash(process.env.USER_PASSWORD, 12),
    }])

    await queryInterface.bulkInsert('articles', [
      {
        title: 'JavaScript',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec pharetra tortor. Nunc odio dolor, fermentum ut porta nec, vulputate et sem. Duis tempor convallis magna id dapibus. Nulla fringilla vestibulum diam in imperdiet. In sit amet augue et nunc vestibulum eleifend ac non velit. Aenean varius facilisis dolor, sed varius ligula aliquet non. Aliquam eget mollis ante. Vivamus cursus, tellus id porttitor tempus, est nunc pretium sem, quis vehicula tellus eros a urna.

        Quisque condimentum quam diam, ac dignissim dui fringilla id. Morbi sit amet lorem eu purus varius vehicula. Integer congue malesuada semper. Aenean venenatis sit amet magna quis lobortis. Phasellus dignissim ante non tempus varius. Curabitur feugiat nulla commodo odio semper pharetra. Nulla vestibulum pulvinar posuere. Fusce mattis tortor nec nisi pharetra, ac facilisis lectus vulputate.
        
        Aenean scelerisque nibh eu nisi commodo consectetur id sed ipsum. In tincidunt ex a nisl rutrum, sit amet lobortis tellus pretium. Nunc neque quam, fringilla in neque in, consectetur egestas erat. Phasellus rhoncus, risus a rutrum efficitur, nisl sapien rutrum tellus, at finibus erat risus in ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc eget bibendum magna. Phasellus cursus neque quis libero vestibulum tincidunt vel sit amet tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ac congue arcu, nec aliquet neque. Duis blandit nisi magna, nec sollicitudin enim sollicitudin non. Morbi et accumsan leo. Donec vehicula porttitor sapien, in fermentum erat vulputate nec. Nulla aliquam accumsan sem consequat blandit.
        
        Vestibulum quam dolor, pharetra nec facilisis cursus, condimentum eget enim. Morbi non arcu aliquet, vestibulum mauris vel, auctor nulla. Mauris elementum tempor nisl, at rutrum neque eleifend quis. Etiam aliquet, libero id pellentesque venenatis, magna nulla suscipit ex, a ullamcorper tortor sapien eu odio. Fusce ut tellus arcu. Etiam interdum ultricies metus, sed facilisis nulla. Curabitur ultrices lorem et est luctus lobortis interdum at odio. Integer in felis fringilla quam aliquet consectetur scelerisque a dolor. Mauris at scelerisque justo. Vestibulum non leo nec felis euismod aliquet vel ac leo. Donec laoreet risus sit amet neque accumsan vehicula. Maecenas hendrerit egestas tempus. Fusce in nulla sed lectus semper rhoncus. Nulla sem risus, dapibus ornare est quis, tincidunt vehicula libero. Morbi feugiat, massa nec viverra porttitor, leo nunc molestie ante, sed tincidunt eros nisi in purus. Cras porta, ligula id viverra pretium, massa sapien cursus nisl, eu laoreet purus velit fermentum lectus.
        
        Duis sollicitudin maximus elit, id mattis nunc ultricies eu. Sed eleifend magna vitae purus varius, nec dictum augue porta. Fusce auctor suscipit ornare. Donec luctus luctus mollis. Aenean dapibus consectetur massa, quis aliquam nisi blandit et. Donec ac dolor tempor, egestas ante non, lobortis neque. Duis ac purus tempus, tempus dui et, rutrum nisi. Vestibulum molestie nibh et elementum dictum. Maecenas malesuada quis felis malesuada commodo. Cras dignissim urna in efficitur tempor. Cras vehicula ipsum sed dui rutrum, a ultrices quam cursus. Donec posuere nisl gravida urna viverra, ac sollicitudin augue tempus.`,
        user_id: 1
        
      }, {
        title: 'Python',
        content: `"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
        user_id: 1,
        
      }
    ])

    await queryInterface.bulkInsert('comments', [
      {
        comment: 'Wow!',
        user_id: 1,
        article_id: 1,
        
      }
    ])
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('articles', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};