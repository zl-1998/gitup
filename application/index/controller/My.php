<?php

namespace app\index\controller;



/**
 * 会员中心
 */
class My
{
    protected $layout = 'default';
    protected $noNeedLogin = ['login', 'register', 'third'];
    protected $noNeedRight = ['*'];

    public function index()
    {
        echo 111;
    }
}
