<?php

namespace common\models\query;

use common\models\People;

/**
 * This is the ActiveQuery class for [[People]].
 *
 * @see People
 */
class PeopleQuery extends \yii\db\ActiveQuery
{
    public function active()
    {
        return $this->andWhere('[[is_active]]=1');
    }

    /**
     * @inheritdoc
     * @return People[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * @inheritdoc
     * @return People|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
