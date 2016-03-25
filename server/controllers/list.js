import { List } from '../models/lists';

export function addNewList(req, res) {
  List.forge({
    user_id: req.user.id,
    title: req.body.title,
  })
  .save()
  .then((list) => {
    res.json({
      data: {
        list: {
          ...list,
          relations: {
            foods: [],
          },
          title: req.body.title,
        },
        type: 'list',
      },
    });
  })
  .catch((err) => {
    res.status(500);
    res.json({
      error: {
        user_id: req.user.id,
        title: req.body.title,
        detail: err,
        type: 'list',
      },
    });
  });
}

export function getUserLists(req, res) {
  if (!req.user) {
    res.json({ lists: null });
  } else {
    List.forge({
      user_id: req.user.id,
    })
    .fetchAll({ withRelated: ['foods'] })
    .then((lists) => {
      res.json({
        data: [
          ...lists.map(list => ({ ...list, type: 'list' })),
        ],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
      res.json({
        error: {
          id: req.body.id,
          detail: err,
          type: 'list',
        },
      });
    });
  }
}

export function deleteList(req, res) {
  List.forge({
    id: req.body.id,
  })
  .destroy()
  .then(() => {
    res.json({
      data: {
        id: req.body.id,
        success: true,
        type: 'list',
      },
    });
  })
  .catch((err) => {
    res.status(500);
    res.json({
      error: {
        id: req.body.id,
        detail: err,
        type: 'list',
      },
    });
  });
}

export function updateList(req, res) {
  List.forge({
    id: req.body.id,
  })
  .fetch({ withRelated: ['foods'] })
  .then((list) => list.related('foods').detach([req.body.foodId]))
  .then(() => {
    res.json({
      data: {
        id: req.body.foodId,
        success: true,
        type: 'food',
      },
    });
  })
  .catch((err) => {
    res.status(500);
    res.json({
      error: {
        id: req.body.foodId,
        detail: err,
        type: 'food',
      },
    });
  });
}
