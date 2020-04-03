const createRecord = require("./createRecord");
const findByMovieId = require("./findByMovieId");
class Comment extends DataProvider {}

Comment.init(
  {
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
      is: /[(\r\n|\r|\n)A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_:#$&/*¡;%?=()"\]\, /[/.-]{2,500}/gi,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      is: /[A-Za-záéëËíóúÁÉÍÓÚñÑ0-9_ .]{3,50}/i,
    },
    movieId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      is: /[0-9]{1,100}/g,
    },
  },
  {
    sequelize: Comment.connection,
    timestamps: true,
    modelName: "Comment",
  }
);

Comment.findByMovieId = findByMovieId;
Comment.createRecord = createRecord;

module.exports = Comment;
